import React from 'react'

export default function ButtonClose({action}) {
  return (
    <button
    className="fixed top-3 right-4 text-black text-lg hover:text-gray-500"
    onClick={action}
  >
    <b>✕</b>
  </button>
  )
}