import React, {useContext} from 'react';
import NewsList from "../src/components/News/NewsList";
import Base from "../src/components/layout/Base";
import FullScreenContent from "../src/components/layout/FullScreenContent";



export default function Index() {
    return (
        <Base title={"Homepage"}>
            <FullScreenContent>
                <div style={{
                    backgroundImage: "url(images/home.jpg)",
                    backgroundPosition: "center center",
                    width: "100%",
                    height: 300,
                }}/>
            </FullScreenContent>
            <NewsList title={"In Evidenza"} type={"featured"}/>
        </Base>
    );
}