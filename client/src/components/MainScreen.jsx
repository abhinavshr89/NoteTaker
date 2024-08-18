import React from 'react'
import { Container, Row } from 'react-bootstrap'
const MainScreen = ({ title, children }) => {
    return (
        <div className='mainback'>
            <Container>
                <Row>
                    <div className='page'>
                        {
                            title && <>
                                <h1 className='
                                text-[30px]
                                mt-[20px]
                         
                                md:text-[50px]  '>{title}</h1>
                                <hr />
                            </>
                        }
                        {children}
                    </div>
                </Row>
            </Container>

        </div>
    )
}

export default MainScreen