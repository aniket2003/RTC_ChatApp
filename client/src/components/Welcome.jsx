import {React ,useState, useEffect}from 'react'
import styled from "styled-components";
import Robot from "../assets/robot.gif"

function Welcome() {

  const [username, setUsername] = useState("");

  async function fetch_data(){
      if(localStorage.getItem("chat-app-user")){
        setUsername(await JSON.parse(localStorage.getItem("chat-app-user")).username)
      }
  }

  useEffect(()=>{
       fetch_data();
  },[])

  

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>Welcome, <span>{username}</span></h1>
      <h3>Please select a chat to Start Messaging</h3>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img {
  height: 20rem;
}
span {
  color: #4e0eff;
}
`;

export default Welcome
