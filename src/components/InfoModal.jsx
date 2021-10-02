import React, {useState} from "react";
import { Button, Icon, Image, Modal } from "semantic-ui-react";


const InfoModal = ({name, image}) => {
    const [open, setOpen] = useState(false);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={
                <Button>
                    <Icon name='eye' />
                    Ver mas
                </Button>
                }
        >
            <Modal.Header>{name}</Modal.Header>
            <Modal.Content image scrolling>
                <Image size='large' src={image} wrapped />

                <Modal.Description>
                {/* Usamos un Lorem en esta parte ya que la api no nos proporciona una descripción del juego */}
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, rem neque. Quaerat reiciendis sapiente impedit nam hic consequatur sit, vero, aliquam porro illum adipisci, tempore magnam perferendis blanditiis ratione sed aspernatur. Accusamus, ipsum molestiae! Incidunt dolores sed voluptatem mollitia qui!
                </p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)} primary>
                    Ok <Icon name='chevron right' />
                </Button>
            </Modal.Actions>
            </Modal>
    )
}

export default InfoModal;