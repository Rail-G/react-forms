import React, { useState } from "react"

export function HexToRgb() {
    const [color, setColor] = useState({rgb: true, color: "rgb(255,255,255)"})

    const CheckColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value
        if (color.length === 7) {
            const rgbColor = (color.match(/\w\w/g) || []).map((ev) => {
              if (parseInt(ev, 16) >= 0 && parseInt(ev, 16) <= 255) {
                return parseInt(ev, 16)
              } 
            });
            return rgbColor.filter(ev => undefined !== ev && /^#[0-9a-f]{6}/gmi.test(color)).length == 3 
            ? setColor({rgb: true, color: `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`}) 
            : setColor({rgb: false, color: 'rgb(255,0,0)'})
        } else {
            setColor({rgb: true, color: "rgb(255,255,255)"})
        }
    }

    return (
        <div className="color-block" style={{backgroundColor: color.color}}>
            <input className="color-type" type="text" onChange={CheckColor}/>
            <p className="color-view">{color.rgb ? color.color : 'Ошибка'}</p>
        </div>
    )
}