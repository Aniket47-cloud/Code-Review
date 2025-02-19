import { useState,useEffect} from 'react'
import Markdown from "react-markdown"
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import rehypeHighlight from "rehype-highlight"
import prism from "prismjs"
import './App.css'
import {PuffLoader} from 'react-spinners'
import axios from "axios"
function App() {
const [code,setCode]=useState(`function sum(){return 1+1}`);
const [load,setLoad]=useState(false);

  const [review,setReview]=useState("")            
 useEffect(()=>{
  prism.highlightAll()
 })

 async function reviewCode(){
   setLoad(true);
  const response= await axios.post(`http://localhost:3000/ai/get-review`,{code});
  setLoad(false);
 setReview(response.data);



 }
  return (
    <>
     <main>
      <div className="left">
        <div className="code">
          <Editor
          value ={code}
          onValueChange={code => setCode(code)}
          highlight={code => prism.highlight(code , prism.languages.javascript, "javascript")}
          padding={10}
          style={{
            fontFamily:'"Fira code","Fira Mono",monospace',
            fontSize: 16,
            border : "1px solid #ddd",
            borderRadius:"5px",
            height:"100%",
            width:"100%"

          }}/>
        </div>
        <div 
        onClick={reviewCode}
        className="review-button">Review</div>
      </div>
      <div className="right">
      {load === true ?( <div className="Loader"><PuffLoader size={90}/></div> )  
       :
       (<Markdown
       rehypePlugins={[rehypeHighlight]} 
       
       
       
       >{review}</Markdown>)}
      </div>
     </main>
    </>
  )
}

export default App
