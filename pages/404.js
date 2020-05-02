import Base from "../src/components/layout/Base";
import React, {useEffect, useState} from "react";
import Section from "../src/components/layout/Section";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import {theme} from "../src/Theme";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import NoSsr from "@material-ui/core/NoSsr";
import Alert from "../src/components/Component/Alert";
import Button from "@material-ui/core/Button";

const Card = (props) => (
    <div onClick={props.onClick}>
        <Paper style={{width: 200, height: 200, padding: 10}}>
            <Fade in={props.fadeIn}>
                <img style={{width: '100%', height: '100%', borderRadius: 4}} src={props.img} alt={props.name}/>
            </Fade>
        </Paper>
    </div>
);

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;
const shuffle = (array) => array.sort(() => Math.random() - 0.5);
const generateCard = (cards) => (
    shuffle([...cards, ...cards]).map(c => ({
            id: getRandomArbitrary(0, 1000),
            fadeIn: false,
            ...c
        })
    )
);
const GAME_STATE = {
    start: 'start',
    lose: 'lose',
    end: 'end',
}

const Custom404 = () => {

    const cards = [
        {image: "/images/paolo-leccese.jpg", name: 'paolo'},
        {image: "/images/viviana-de-simone.jpg", name: 'viviana'},
        {image: "/images/gabriele-cortina.jpg", name: 'gabriele'},
        {image: "/images/flavio-finocchi.jpg", name: 'flavio'},
        {image: "/images/jonathan-alfieri.jpg", name: 'jonathan'},
        {image: "/images/marcello-roehrssen.jpg", name: 'marcello'},
        {image: "/images/pamela-ceccarelli.jpg", name: 'pamela'},
        {image: "/images/paolo-micheli.jpg", name: 'paolom'},
    ];

    const [hasStarted, setHasStarted] = useState(false);
    const [gameState, setGameState] = useState(GAME_STATE.start);
    const [playGroundState, setPlayGroundState] = useState(generateCard(cards));
    const [points, setPoints] = useState([]);
    const [hasWon, setHasWon] = useState(false);

    useEffect(() => {
        if (!hasStarted) return;

        const [firstCard, secondCard] = playGroundState
            .filter(el => points.indexOf(el.name) === -1)
            .filter(el => el.fadeIn);
        if (firstCard !== undefined && secondCard !== undefined) {
            if (firstCard.name === secondCard.name && firstCard.id !== secondCard.id) {
                setPoints([...points, firstCard.name]);
                if ((points.length + 1) === cards.length) {
                    setGameState(GAME_STATE.end);
                }
            } else {
                setGameState(GAME_STATE.lose);
            }
        }
    }, [playGroundState]);

    useEffect(() => {
        const flipAll = setInterval(() => {
            if (gameState === GAME_STATE.lose) {
                const p = [...playGroundState];
                setPlayGroundState(
                    p.map(c => {
                        if (points.indexOf(c.name) === -1) {
                            return {...c, fadeIn: false}
                        }
                        return {...c};
                    })
                );
                setGameState(GAME_STATE.start);
            }
            if (gameState === GAME_STATE.end) {
                setHasWon(true);
            }
        }, 500);

        return () => {
            clearInterval(flipAll)
        }
    }, [gameState]);

    const reset = () => {
        setGameState(GAME_STATE.start);
        setHasStarted(false);
        setPoints([]);
        setPlayGroundState(generateCard(cards));
        setHasWon(false)
    };

    return (
        <Base title={'Pagina non trovata'} image={'/images/home.jpg'}>
            <Section title={'Pagina non trovata'}>
                <Typography>
                    La pagina che stavi cercando non è stata trovata, adesso hai due possibilità:
                </Typography>
                <Typography component={"div"}>
                    <ul>
                        <li>Tornare alla <Link href={'/'}><a
                            style={{color: theme.palette.primary.main}}>homepage</a></Link></li>
                        <li>Giocare a memory qui sotto e poi tornare alla <Link href={'/'}><a
                            style={{color: theme.palette.primary.main}}>homepage</a></Link></li>
                    </ul>
                </Typography>
                <NoSsr>
                    {!hasStarted &&
                    <Button variant="contained" color="primary" onClick={() => setHasStarted(true)}>Comincia il
                        gioco</Button>}
                    {hasStarted && <Button variant="contained" color="primary" onClick={() => reset()}>Reset</Button>}
                    <Section
                        title={'Punti:' + points.length}>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
                            {
                                playGroundState.map((c, index) => {
                                    return (
                                        <Grid item key={getRandomArbitrary(0, 100)}>
                                            <Card img={c.image}
                                                  name={c.name}
                                                  uid={c.id}
                                                  fadeIn={c.fadeIn}
                                                  onClick={
                                                      () => {
                                                          if (!hasStarted) {
                                                              return;
                                                          }
                                                          if (points.filter((e) => e === c.name).length > 0) {
                                                              return;
                                                          }
                                                          const p = [...playGroundState];
                                                          p[index] = {...c, fadeIn: !c.fadeIn};
                                                          setPlayGroundState(p);
                                                      }
                                                  }/>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Section>
                    <Alert open={hasWon}
                           title={'Hai vinto!'}
                           text={'Bravo hai vinto il gioco, adesso dovresti tornare alla homepage'}
                           onConfirm={() => {
                               document.location.href = '/'
                           }}
                           confirmLabel={'Si ok, mi hai convinto!'}
                           onCancel={() => reset()}
                           cancelLabel={'No! Voglio giocare ancora!'}
                    />
                </NoSsr>
            </Section>
        </Base>
    );
}

export default Custom404;
