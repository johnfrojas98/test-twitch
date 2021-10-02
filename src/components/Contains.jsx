import React, {useEffect, useState} from  'react';
import { Container, Grid, Image, Card } from 'semantic-ui-react';
import request from 'request';
import InfoModal from './InfoModal';
import '../styles/contains.scss';

const Contains = () => {

    const [data, setData] = useState();
    const [search, setSearch] = useState(data);


    // Llamamos a la funcion de solicitud del access-token, cuando la app inicia.
    useEffect(() => {
        getToken();
    }, [])

    // Cuando ya tenemos el access-Token, procedemos a realizar la petición de los juegos, la cual nos da como respuesta 
    // un id, nombre y url de imagen
    const getData = (accessToken) => {
        setTimeout(() => {
            // Objeto de configuracion para la petición
            const gameOptions = {
                url: 'https://api.twitch.tv/helix/games/top?first=100',
                method: 'GET',
                headers:{
                    'Client-ID': '6mj0uwd5ntwiph5714n22vn9nfp6sw',
                    'Authorization': 'Bearer ' + accessToken
                }
            }

            // Verificamos si exite el token
            if(!accessToken){
                console.log("No Token");
            }else{
                // Realizamos la petición
                request.get(gameOptions,(err,res,body) => {
                    if(err){
                        return console.log(err);
                    }
                    let {data} = JSON.parse(body);
                    // Recibimos la data y la almacenamos en el hook para mostrarla inicialmente
                    setData(data);
                    // La almacenamos tambien aca para cuando se hace uso de la barra de busqueda
                    setSearch(data);
                });
            };
        
        },100)
    }

    // Función para solicitar el access Token
    const getToken = () => {
        // Objeto de configuración
        const options = {
            url: 'https://id.twitch.tv/oauth2/token',
            json:true,
            body: {
            client_id: '6mj0uwd5ntwiph5714n22vn9nfp6sw',
            client_secret: 'q2d2eoadajrjue1unmjji5uypxs877',
            grant_type: 'client_credentials'
            }
        };
        // Petición del access Token
        request.post(options, (err,res,body)=>{
            if(err){
                return console.log(err);
            }
            getData(body.access_token)
        });
            
    }

    // Función para reemplazar los valores(width, height) que vienen en la URL de la imagen del juego y retornar 
    // una URL adecuada para usar donde se requiera
    const settingIMG = (image) => {
        let imgWidth = image.replace('{width}', '250');
        return imgWidth.replace('{height}', '250');
    }

    // Función para la barra de busqueda
    const filterGame = (event) => {
        var text = event.target.value
        const datas = data
        const newData = datas.filter((item) => {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        setSearch(newData);
    }

    return (
        <Container>
            <div className="container_search">
                <input className="container_input" type="text" placeholder="Buscar..." onChange={text => filterGame(text)}/>
            </div>
            <Grid columns={3} divided>
                <Grid.Row>
                    {search && search.map(d =>
                        <Grid.Column key={d.id}>
                            <div className="container_card">
                                <Card>
                                    <Image src={settingIMG(d.box_art_url)}/>
                                    <Card.Content>
                                        <Card.Header>{d.name}</Card.Header>
                                        <Card.Description>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet eum, laborum enim perspiciatis earum odio.
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <InfoModal 
                                            name={d.name} 
                                            image={settingIMG(d.box_art_url)}
                                        />
                                    </Card.Content>
                                </Card>
                            </div>
                        </Grid.Column>
                        ) 
                    }
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default Contains;