import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const About = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
             <Button variant="info" onClick={handleShow}>About</Button>
            <Modal 
                show={show} 
                onHide={handleClose}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Rules</h3>
                    1. Any live cell with fewer than two live neighbors dies, as if by under population. <br></br>
                    2. Any live cell with two or three live neighbors lives on to the next generation. <br></br>
                    3. Any live cell with more than three live neighbors dies, as if by overpopulation. <br></br>
                    4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default About