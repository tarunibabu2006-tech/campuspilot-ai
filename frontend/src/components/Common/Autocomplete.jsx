import React, { useState, useEffect, useRef } from 'react'

/**
 * Reusable Smart Autocomplete Input Component
 * Props:
 * - value: string
 * - onChange: (newValue: string) => void
 * - options: string[] (all possible options to match against)
 * - placeholder: string
 * - multiSelect: boolean (if true, appends selected value to comma-separated list)
 * - icon: string (optional emoji or icon prefix)
 * - style: object
 * - className: string
 * - required: boolean
 */
function Autocomplete({
  value = '',
  onChange,
  options = [],
  placeholder = 'Start typing...',
  multiSelect = false,
  icon,
  style = {},
  className = 'form-input',
  required = false
}) {
  const [inputValue, setInputValue] = useState(value)
  const [filteredOptions, setFilteredOptions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  // Filter options based on input value
  const handleInputChange = (e) => {
    const val = e.target.value
    setInputValue(val)
    if (onChange) onChange(val)

    if (!val.trim()) {
      setFilteredOptions(options.slice(0, 15))
      setIsOpen(true)
      return
    }

    let searchToken = val
    if (multiSelect && val.includes(',')) {
      const parts = val.split(',')
      searchToken = parts[parts.length - 1].trim()
    }

    if (!searchToken) {
      setFilteredOptions(options.slice(0, 15))
      setIsOpen(true)
      return
    }

    const searchLower = searchToken.toLowerCase()
    const matches = options.filter(opt =>
      opt.toLowerCase().includes(searchLower)
    ).slice(0, 50)

    setFilteredOptions(matches)
    setIsOpen(true)
  }

  const handleSelectOption = (opt) => {
    let newVal = opt
    if (multiSelect && inputValue.includes(',')) {
      const parts = inputValue.split(',')
      parts[parts.length - 1] = ' ' + opt
      newVal = parts.join(',').trim()
    }
    setInputValue(newVal)
    if (onChange) onChange(newVal)
    setIsOpen(false)
  }

  const handleFocus = () => {
    let searchToken = inputValue
    if (multiSelect && inputValue.includes(',')) {
      const parts = inputValue.split(',')
      searchToken = parts[parts.length - 1].trim()
    }
    const searchLower = searchToken.toLowerCase()
    const matches = searchToken
      ? options.filter(opt => opt.toLowerCase().includes(searchLower)).slice(0, 50)
      : options.slice(0, 25)

    setFilteredOptions(matches)
    setIsOpen(true)
  }

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute',
            left: '0.85rem',
            fontSize: '1rem',
            pointerEvents: 'none',
            zIndex: 1
          }}>
            {icon}
          </span>
        )}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={className}
          required={required}
          style={{
            width: '100%',
            paddingLeft: icon ? '2.5rem' : '1rem',
            ...style
          }}
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.35rem',
          maxHeight: '220px',
          overflowY: 'auto',
          background: '#0f172a',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          borderRadius: '10px',
          padding: '0.35rem 0',
          margin: 0,
          listStyle: 'none',
          zIndex: 9999,
          boxShadow: '0 12px 32px rgba(0,0,0,0.8)',
          backdropFilter: 'blur(12px)'
        }}>
          {filteredOptions.map((opt, idx) => (
            <li
              key={idx}
              onMouseDown={() => handleSelectOption(opt)}
              style={{
                padding: '0.55rem 1rem',
                fontSize: '0.85rem',
                color: '#e2e8f0',
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.25)'
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#e2e8f0'
              }}
            >
              <span>{opt}</span>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Select ↵</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Autocomplete
