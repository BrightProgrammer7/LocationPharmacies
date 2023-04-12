import Card from 'react-bootstrap/Card';
import Carousel from 'better-react-carousel'


import logo from '../assets/images/logo.png';

function Cards({data}) {
  return (
    <>
        <Carousel cols={3} rows={3} gap={10} loop>
        { data.map((item) => {
            return(
                <Carousel.Item>
                    <Card key={item._id} style={{ width: '18rem', margin: '5px' }}>
                        <Carousel cols={1} rows={1} gap={0} loop>
                            <Carousel.Item>
                                <Card.Img variant="top" src={logo} />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Card.Img variant="top" src={logo} />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Card.Img variant="top" src={logo} />
                            </Carousel.Item>
                        </Carousel>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{item.garde}</Card.Subtitle>
                            <Card.Text>
                                {item.address}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
            )
        })}
        </Carousel>
    </>
  );
}

export default Cards;