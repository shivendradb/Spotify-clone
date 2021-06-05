import React from "react";
import { useStateValue } from "../../StateProvider";
import "./BodyProfile.css";
import ContainerSmall from "./ContainerSmall";

function BodyProfile({ spotify }) {
  const [{ playlists }, dispatch] = useStateValue();

  // const Greetings = () => {
  //   var today = new Date();
  //   var time = today.getHours();
  //   if (time < 12) {
  //     return <h1>Good Morning</h1>;
  //   } else if (time > 12 && time < 4) {
  //     return <h1>Good Afternoon</h1>;
  //   } else {
  //     return <h1>Good Evening</h1>;
  //   }
  // };
  return (
    <div className="body">
      {/* <div className="greeting">{Greetings}</div> */}

      <div className="ContainerSmall">
      {playlists?.items?.map((item) => {
            return(<ContainerSmall />)
            
        })}
        
        <ContainerSmall />
      </div>
      <div className="ContainerSmall">
        <ContainerSmall />
        <ContainerSmall />
        <ContainerSmall />
      </div>

      <div className="playlist">
        
      </div>
    </div>
  );
}
export default BodyProfile;
