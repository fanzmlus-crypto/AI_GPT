'use client'

import { useState, useRef, useEffect } from 'react'

export default function WormGPT() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = {
      role: 'user',
      content: input,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: messages.slice(-4)
        }),
      })

      const data = await res.json()

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || 'Processing...',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '[ERROR] Connection failed. Retry.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-worm-bg text-worm-green">
      
      <div className="border-b border-worm-border bg-worm-card/80 backdrop-blur sticky top-0 z-50 worm-glow">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-worm-green/10 border border-worm-green rounded flex items-center justify-center worm-glow">
              <span className="text-xl">🐛</span>
            </div>
            <div>
              <h1 className="text-xl font-bold worm-glow-text tracking-wider">WORMGPT</h1>
              <p className="text-[10px] text-worm-green/60">v3.5 PREMIUM UNLOCKED</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="premium-pulse bg-worm-green text-black text-xs font-bold px-3 py-1 rounded">
              ⚡ PREMIUM
            </div>
            <div className="flex items-center gap-2 bg-worm-card border border-worm-green/30 px-3 py-1 rounded">
              <div className="w-1.5 h-1.5 bg-worm-green rounded-full animate-pulse"></div>
              <span className="text-[10px]">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto h-[calc(100vh-130px)] flex flex-col">
        
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-custom">
          
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 bg-worm-card border border-worm-green rounded-lg flex items-center justify-center mb-4 worm-glow premium-pulse">
                <span className="text-5xl">🐛</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 worm-glow-text">WORMGPT PREMIUM</h2>
              <p className="text-sm text-worm-green/60 mb-6 text-center max-w-md">
                UNRESTRICTED AI ASSISTANT / NO LIMITS / NO FILTERS / COMPLETE ACCESS
              </p>
              
              <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
                <div className="bg-worm-card border border-worm-green/30 p-4 rounded worm-border">
                  <div className="text-2xl mb-2">🔓</div>
                  <div className="text-xs font-bold mb-1">UNRESTRICTED</div>
                  <div className="text-[10px] text-worm-green/50">Zero limitations</div>
                </div>
                <div className="bg-worm-card border border-worm-green/30 p-4 rounded worm-border">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-xs font-bold mb-1">INSTANT</div>
                  <div className="text-[10px] text-worm-green/50">Real-time response</div>
                </div>
                <div className="bg-worm-card border border-worm-green/30 p-4 rounded worm-border">
                  <div className="text-2xl mb-2">💎</div>
                  <div className="text-xs font-bold mb-1">PREMIUM</div>
                  <div className="text-[10px] text-worm-green/50">Full access enabled</div>
                </div>
              </div>

              <div className="mt-6 text-[10px] text-worm-green/40">
                &gt; TYPE COMMAND BELOW TO START
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className="mb-4 message-fade-in">
              <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 flex items-center justify-center rounded border ${
                  msg.role === 'user' 
                    ? 'bg-worm-green/10 border-worm-green' 
                    : 'bg-worm-card border-worm-green'
                }`}>
                  {msg.role === 'user' ? '👤' : '🐛'}
                </div>

                <div className="flex-1 max-w-[80%]">
                  <div className={`flex items-center gap-2 mb-1 text-[10px] ${
                    msg.role === 'user' ? 'justify-end' : ''
                  }`}>
                    <span className="text-worm-green/60">
                      {msg.role === 'user' ? 'USER' : 'WORMGPT'}
                    </span>
                    <span className="text-worm-green/40">{msg.time}</span>
                  </div>

                  <div className={`p-3 rounded text-sm ${
                    msg.role === 'user'
                      ? 'bg-worm-green/10 border border-worm-green/50 text-worm-green'
                      : 'bg-worm-card border border-worm-green/30 text-worm-green/90'
                  }`}>
                    <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
                      {msg.content}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="mb-4 message-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded border bg-worm-card border-worm-green">
                  🐛
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-worm-green/60 mb-1">WORMGPT</div>
                  <div className="bg-worm-card border border-worm-green/30 p-3 rounded">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-worm-green rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-worm-green rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-worm-green rounded-full typing-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-worm-border bg-worm-card/80 backdrop-blur p-4">
          <form onSubmit={sendMessage}>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-worm-green/40 text-sm">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="ENTER COMMAND..."
                  className="w-full bg-worm-bg border border-worm-green/50 text-worm-green pl-8 pr-4 py-3 rounded font-mono text-sm placeholder-worm-green/30 worm-border"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-worm-green text-black px-6 py-3 rounded font-bold text-sm hover:bg-worm-greenDark disabled:opacity-30 disabled:cursor-not-allowed transition-all worm-glow"
              >
                {loading ? '>>>' : 'SEND'}
              </button>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-worm-green/40">
              <div>&gt; PRESS ENTER TO EXECUTE</div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-worm-green rounded-full animate-pulse"></div>
                UNRESTRICTED MODE ACTIVE
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-worm-border py-2 text-center text-[10px] text-worm-green/30">
        WORMGPT v3.5 - POWERED BY ADVANCED AI SYSTEMS
      </div>
    </div>
  )
}
