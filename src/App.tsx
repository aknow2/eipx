import React, { useEffect, useState } from 'react';
import './App.css';

const numOfCol = 16;

interface Pixel {
  id: string;
  left: number;
  top: number;
  color: string;
}

interface State {
  title: string;
  size: number;
  pixels: Pixel[];
}

const createE = (size: number) => {
  const color = "#ff00ff";
  return [
    {
      id: color+"1",
      left: size * 2,
      top: size,
      color,
    },
    {
      id: color+"2",
      left: size,
      top: size,
      color,
    },
    {
      id: color+"3",
      left: size,
      top: size*2,
      color,
    },
    {
      id: color+"4",
      left: size,
      top: size*3,
      color,
    },
    {
      id: color+"5",
      left: size*2,
      top: size*3,
      color,
    },
    {
      id: color+"6",
      left: size,
      top: size*4,
      color,
    },
    {
      id: color+"7",
      left: size,
      top: size*5,
      color,
    },
    {
      id: color+"8",
      left: size*2,
      top: size*5,
      color,
    },
  ]
}

const createI = (size: number) => {
  const color = "#00ff00";
  return [
    {
      id: color+"1",
      left: size * 4,
      top: size,
      color,
    },
    {
      id: color+"2",
      left: size * 5,
      top: size,
      color,
    },
    {
      id: color+"3",
      left: size * 6,
      top: size,
      color,
    },
    {
      id: color+"4",
      left: size * 5,
      top: size*2,
      color,
    },
    {
      id: color+"5",
      left: size * 5,
      top: size*3,
      color,
    },
    {
      id: color+"6",
      left: size * 5,
      top: size*4,
      color,
    },
    {
      id: color+"7",
      left: size * 5,
      top: size*5,
      color,
    },
    {
      id: color+"8",
      left: size * 4,
      top: size*5,
      color,
    },
    {
      id: color+"9",
      left: size * 6,
      top: size*5,
      color,
    },
  ]
}
const createP = (size: number) => {
  const color = "#ffff00";
  return [
    {
      id: color+"1",
      left: size * 8,
      top: size,
      color,
    },
    {
      id: color+"2",
      left: size * 9,
      top: size,
      color,
    },
    {
      id: color+"3",
      left: size * 8,
      top: size*2,
      color,
    },
    {
      id: color+"4",
      left: size * 10,
      top: size*2,
      color,
    },
    {
      id: color+"5",
      left: size * 8,
      top: size*3,
      color,
    },
    {
      id: color+"6",
      left: size * 9,
      top: size*3,
      color,
    },
    {
      id: color+"7",
      left: size * 8,
      top: size*4,
      color,
    },
    {
      id: color+"8",
      left: size * 8,
      top: size*5,
      color,
    },
  ]
}

const createX = (size: number) => {
  const color = "#00ffff";
  return [
    {
      id: color+"1",
      left: size * 12,
      top: size,
      color,
    },
    {
      id: color+"2",
      left: size * 12,
      top: size *2 ,
      color,
    },
    {
      id: color+"3",
      left: size * 14,
      top: size,
      color,
    },
    {
      id: color+"4",
      left: size * 14,
      top: size *2 ,
      color,
    },
     {
      id: color+"5",
      left: size * 13,
      top: size *3 ,
      color,
    },
     {
      id: color+"6",
      left: size * 12,
      top: size *4 ,
      color,
    },
     {
      id: color+"7",
      left: size * 12,
      top: size *5 ,
      color,
    },
     {
      id: color+"8",
      left: size * 14,
      top: size *4 ,
      color,
    },
     {
      id: color+"9",
      left: size * 14,
      top: size *5 ,
      color,
    },
  ]
}

const getSize = () => {
  return window.innerWidth/numOfCol;
}
const getSubtitle = () => {
  const language = (window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language;
  return language.toLowerCase() === 'ja-jp'? '地図上にドット絵を描こう！': 'Drawing pixel art on map';
}
const createPixels = () => {
  const size = getSize();
  return createE(size)
    .concat(createI(size))
    .concat(createP(size))
    .concat(createX(size));
}

const createState = () => {
  const title = getSubtitle()
  const size = getSize();
  const pixels = createPixels();
    return {
      title,
      size,
      pixels,
    } as State;
}
const App: React.FC = () => {
  const [state, setState] = useState<State>({
    title: "",
    size: 0,
    pixels: [],
  });

  useEffect(() => {
    console.log('init')
    const subtitle = getSubtitle();
    const generateTitle = () => {
      const state = createState();
      setState(state);
    }
    window.addEventListener("resize", generateTitle);
    generateTitle();
    const size = getSize();
    const pixels = createPixels(); 
    pixels.sort(() => Math.random() - 0.5);

    let index = 0;
    const setPixels = [] as Pixel[];
    const genPx = () => {
      setPixels.push(pixels[index])
      setState({
        title: subtitle,
        size,
        pixels: setPixels,
      })
      index++;
      if (index < pixels.length) {
        requestAnimationFrame(genPx);
      }
    };
    requestAnimationFrame(genPx)

    return () => {
      window.removeEventListener("resize", generateTitle)
    }
  }, [])

  const contentPos = (state.size * 17 + 150) < window.innerHeight? state.size * 15 : (state.size * 10 + 150) < window.innerHeight ? state.size * 9 : state.size* 6;

  return (
    <div className="App" style={{display: "flex", justifyContent:"center"}}>
      {
        state.pixels.map((px) => {
          return (<div
            key={px.id}
            className="pixel"
            style={
            {
              width: state.size,
              height: state.size,
              position: 'absolute',
              backgroundColor: px.color,
              left: px.left,
              top: px.top, 
            }
          } />);
        })
      }
      <div style={{position: "fixed", top: contentPos, height: "20vh", width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{display: "flex", flexDirection: "column"}}>
        <div>
          <h2 style={{color: "white"}}>
            {state.title}
          </h2>
        </div>
        <a href="https://play.google.com/store/apps/details?id=jp.aknow2.eipx">
          <img src="./playstore.png" alt="appstore" width="140" height="60"/>
        </a>
        <div style={{position: "relative"}}>
          <img src="./appstore.png" alt="appstore"  width="130" height="45"/>
        </div>
        </div>
      </div>
      <footer style={{color: "white", position:"fixed", bottom: 4 }}>
        @copyright aKnow2
      </footer>
    </div>
  );
}

export default App;
