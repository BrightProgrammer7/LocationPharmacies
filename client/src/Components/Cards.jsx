import Card from 'react-bootstrap/Card';
import Carousel from 'better-react-carousel'


// import logo from '../assets/images/logo.png';
const ImgPath = `${process.env.PUBLIC_URL}/images/`;

function Cards({data}) {
  return (
    <>
        <Carousel cols={3} rows={3} gap={10} loop scrollSnap={true}>
        { data.map((item) => {
            return(
                <Carousel.Item>
                    <Card key={item._id} style={{ width: '18rem', margin: '5px' }}>
                        <Carousel cols={1} rows={1} gap={0} autoplay={2000} loop scrollSnap={true}>
                            {item.images.map((img) => (
                                    <Carousel.Item>
                                        <Card.Img className="mt-3" variant="top" src={ ImgPath + img.url} />
                                    </Carousel.Item>
                                )
                            )}
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