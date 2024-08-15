import React from 'react'
import { Container,Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer 
            className="
                w-full 
                absolute 
                bottom-0 
                flex 
                justify-center
            "
        >
            <Container>
                <Col className='text-center py-3'>Copyright &copy; Note Zipper</Col>
            </Container>
        </footer>
    )
}

export default Footer
