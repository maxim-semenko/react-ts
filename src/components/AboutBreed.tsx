import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/reducers/RootReducers";
import {fetchBreedAction} from "../redux/actions/BreedsAction";
import {Button, Col, Container, Navbar, Row} from "react-bootstrap";
import spinner from "../img/spinner.svg";
import {Link} from "react-router-dom";


function AboutBreed(props: any) {

    const dispatch = useDispatch()
    const {breed, loading} = useSelector((state: RootStateType) => state.breed)

    useEffect(() => {
        dispatch(fetchBreedAction.request(props.match.params.name))
    }, [])


    const showContent = () => {
        if (breed !== undefined && breed !== null) {
            return (
                <Container fluid>
                    <Navbar expand="lg" variant="light" bg="light">
                        <Container fluid>
                            <Link to={{pathname: `/`}}>
                                <Button style={{
                                    backgroundColor: "#efeff6",
                                    border: "1px solid grey",
                                    color: "black"
                                }}>Back to Library
                                </Button>
                            </Link>
                            <Navbar.Collapse className="justify-content-center">
                                <h1>{breed.name}</h1>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Row>
                        <Col lg={3}>
                            <img src={localStorage.getItem("url_image")} width="380px" height="350px"
                                 alt={"img"}/>
                        </Col>
                        <Col lg={9}>
                            <p><b>Description: </b>{breed.description}</p>
                            <div>
                                <b style={{display: "block", float: "left", marginRight: "5px"}}>
                                    Temperament:
                                </b>
                                {
                                    breed.temperament.split(',').map(temperament =>
                                        <div style={{
                                            background: "#3486eb",
                                            display: "block",
                                            float: "left",
                                            borderRadius: "5px",
                                            color: "white",
                                            marginRight: "3px",
                                            padding: "3px"
                                        }}>
                                            {temperament}
                                        </div>
                                    )
                                }
                            </div>
                            <br/>
                            <br/>
                            <p><b>Origin: </b>{breed.origin}</p>
                            <p><b>Weight: </b>{breed.weight.imperial}</p>
                        </Col>
                    </Row>
                    <a href={breed.wikipedia_url}>{breed.wikipedia_url}</a>
                </Container>
            )
        }
    }

    return (
        <div>
            {
                loading ?
                    <div>
                        <img alt="" src={spinner}
                             style={{resize: "both", width: "100%", height: "128px"}}/>
                    </div>
                    :
                    <div>
                        {showContent()}
                    </div>
            }
        </div>
    );
}

export default AboutBreed;