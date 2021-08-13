// // react-liff  version

// import React, { useEffect, useState } from 'react';
// import { useLiff } from 'react-liff';

// import './App.css';

// // import liff from '@line/liff';
// // liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID });

// // require('dotenv').config();

// const App = () => {
//   const [displayName, setDisplayName] = useState('');
//   const { error, liff, isLoggedIn, ready } = useLiff();

  
  

//   useEffect(() => {
//     if (!isLoggedIn) {
//         console.log(isLoggedIn);
//         return;
//     }
//     (async () => {
//       const profile = await liff.getProfile();
//       console.log("isLoggedIn: "+isLoggedIn);
//       console.log("ready: "+ready)
//       console.log(profile);
//       setDisplayName(profile.displayName);
//       //setDisplayName("Toby");
//     })();
//   }, [liff, isLoggedIn]);

//   // useEffect(()  =>{
//   //   console.log("sth change");
//   // });


//   const showDisplayName = () => {
//     if (error) return <p>Something is wrong.</p>;
//     if (!ready) return <p>Loading...</p>;

//     if (!isLoggedIn) {
//       return <button className="App-button" onClick={liff.login}>Login</button>;
//     }
//     return (
//       <>
//         <p>Welcome to the react-liff demo app, {displayName}!</p>
//         <button className="App-button" onClick={liff.logout}>Logout</button>
//       </>
//     );
//   }
//   //<p>Welcome to the react-liff demo app, {displayName}!</p>
//   //<p>Welcome to the react-liff demo app, Toby!</p>
//   return (
//     <div className="App">
//       <header className="App-header">{showDisplayName()}</header>
//     </div>
//   );
// }

// export default App;




// @line-liff version

//import React from 'react';
import liff from '@line/liff';

import './App.css';

import client from "./WebSocket-Client";

import React, { useEffect, useState } from 'react';

//require('dotenv').config();
//require("dotenv-defaults").config();




//var liffId = "";
//var liffId = "1656259288-QBpqae19";

function App() {
  //const liffId =  String(process.env.REACT_APP_LIFF_ID) ;

  const [liffId, setLiffId] = useState('');
  const [haslogin,setHaslogin] = useState('');
  const [pictureUrl,setPictureUrl] = useState('');

  
  

  const sendData = (data) => {
    client.send(JSON.stringify(data));
  };

  
  client.onopen = function() {
      console.log('WebSocket Client Connected');

      // function sendNumber() {
      //     if (client.readyState === client.OPEN) {
      //         var number = Math.round(Math.random() * 0xFFFFFF);
      //         client.send(number.toString());
      //         setTimeout(sendNumber, 1000);
      //     }
      // }
      // sendNumber();
      
      if (liffId === "") {
        sendData(["get-liffId", {}]);
      }
  };

  client.onmessage = (message) => {
    const { data } = message;
    const [task, payload] = JSON.parse(data);

    switch (task) {
        case "send-liffId": {
            console.log("client.onmessage: send-liffId");
            
            setLiffId(payload.liffId);
            console.log("receive liffId!")

            if (liff.isLoggedIn){ setHaslogin('true')}
            else{setHaslogin('false')}; 

            
            
            break;
        }
        default: {
            break;
        }
    }
  };

  
  const sendMessage = async () => {

    // if (liffId === "") {
    //   await sendData(["get-liffId", {}]);
      
    // }

    liff.init({liffId: liffId })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({})
        } else if (liff.isInClient()) {
          liff.sendMessages([{
            'type': 'text',
            'text': "You've successfully sent a message! Hooray!"
          }]).then(function() {
            window.alert('Message sent');
          }).catch(function(error) {
            window.alert('Error sending message: ' + error);
          });
        }
      })
  }

  const getUserInfo = () => {
    liff.init({liffId: liffId })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({})
        } else if (liff.isInClient() || true) {
          liff.getProfile()
            .then(async (profile) => {
              const userId = profile.userId
              const displayName = profile.displayName

              setPictureUrl(profile.pictureUrl);
              
              console.log(userId);
              console.log(displayName);
              
              
              alert(`Name: ${displayName}, userId: ${userId}`)
            }).catch(function(error) {
              window.alert('Error sending message: ' + error);
            });
        }
      })

  }
  
  const login = () => {
    liff.init({liffId: liffId})
      .then(() => {
        if (!liff.isLoggedIn()){
          liff.login();
          
        }
        setHaslogin('true');
      })
  }

  const logout = () => {
    liff.init({liffId: liffId})
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.logout()
        }
        setHaslogin('false');
      })

  }


  return (
    <div className="App">
      <header className="App-header">

        
        
        
       
        <p> isLoggedIn: {haslogin}</p>
        
        <button className="button" onClick={sendMessage}>send message</button>
        <button className="button" onClick={getUserInfo}>show user info</button>
        <button className="button" onClick={login}>login</button>
        <button className="button" onClick={logout}>logout</button>

        <img src={pictureUrl}/>
        


        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;