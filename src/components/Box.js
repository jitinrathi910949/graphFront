import React from 'react'
import { ResizableBox } from 'react-resizable'
import './BoxStyle.css';
export default function Box ({
  children,
  width = 500,
  height = 500,
  resizable = true,
  style = {},
  className,
}) {
  return (
    <div style={{marginTop: '25px'}}>
      {resizable ? (
        <ResizableBox width={'100%'} height={height}>
          <div
            style={{
              ...style,
              width: '100%',
              height: '100%',
            }}
            className={className}
          >
            {children}
          </div>
        </ResizableBox>
      ) : (
        <div
          style={{
            width: `100%`,
            height: `${height}px`,
            ...style,
          }}
          className={className}
        >
          {children}
        </div>
      )}
    </div>
  )
}