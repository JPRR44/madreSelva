import React,{useState}  from 'react'; //Use effect used on load
import './uploads.scss';
import { Container,Row,Col,Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Modal from 'react-modal'
import FileDownload from 'js-file-download'

const Uploads = () => {
    const urlPdf = 'https://madreselva.ddns.net/api/publish/pdf'
    const urlVideo = 'https://madreselva.ddns.net/api/publish/videoLink'
    const urlAgreementTemplate = 'https://madreselva.ddns.net/api/files/agreementTemplate'

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
      }
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(){
      setIsOpen(true);
    }
    function closeModal(){
      setIsOpen(false)
    }
    
    const [data, setData] = useState({
      author: '',
      title: '',
      abstract: '',
      category: '',
      videoLink: null,
      document: null,
      agreement: null,
    })
    
    // Passes the info from the form to the newData JSON
    const myFunction = (e) => {
      const newData = { ...data }
      if(e.target.id == 'document'){
        newData[e.target.id] = e.target.files[0]
        setData(newData)
      }
      else if(e.target.id == 'agreement'){
        newData[e.target.id] = e.target.files[0]
        setData(newData)

      }
      else {
        newData[e.target.id] = e.target.value
        setData(newData)
      }
    }

    const submitPDF = (e)=>{
      e.preventDefault()
      let bodyFormData = new FormData()

      bodyFormData.append('author',data.author)
      bodyFormData.append('title',data.title)
      bodyFormData.append('abstract',data.abstract)
      bodyFormData.append('category',data.category)
      bodyFormData.append('document',data.document)
      bodyFormData.append('videoLink',data.videoLink)
      bodyFormData.append('agreement',data.agreement)

      axios({
        method: "post",
        url: urlPdf,
        data: bodyFormData,
        headers: {"Content-Type":"multipart/form-data"}
      }).then(res => {
        console.log('??result!');
        console.log(res);
        //open modal only if documents are uploaded correctly
        if(res.status == 200) openModal()
      }).catch(err=>{
        return console.log(err);
      })
    }


    const submitVideo = (e)=>{
      e.preventDefault()
      let bodyFormData = new FormData()

      bodyFormData.append('author',data.author)
      bodyFormData.append('title',data.title)
      bodyFormData.append('abstract',data.abstract)
      bodyFormData.append('category',data.category)
      bodyFormData.append('document',data.document)
      bodyFormData.append('videoLink',data.videoLink)
      bodyFormData.append('agreement',data.agreement)

      axios({
        method: "post",
        url: urlVideo,
        data: bodyFormData,
        headers: {"Content-Type":"multipart/form-data"}
      }).then(res => {
        console.log('??result!');
        console.log(res);
        //open modal only if documents are uploaded correctly
        if(res.status == 200) openModal()
      }).catch(err=>{
        return console.log(err);
      })
      
    }

    const downloadAgreementTemplate = (e) => {
      axios({
        url: urlAgreementTemplate,
        method:"GET",
        responseType: 'blob' // important for FileDownload
      })
      .then(res => {
        console.log(res);
        FileDownload(res.data, 'CartaUsoDeContenidos.docx')
      })
      .catch(err => {
        console.log(err);
      })
    }

  return (
    <Container className='UploadsContainer'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Container className='ClientContainer'>
            <h1>Documentos subidos exitosamente </h1>
          </Container>
        </Modal>
      <Row>
        <Col>
        <h1  className='titles'>Criterios de publicaci??n</h1>
        <ul>
          <li>
            <p>Al ser una plataforma especializada en contenidos de <b>arte y cultura</b> es necesario que los trabajos acad??micos que soliciten publicaci??n tengan que ver con estos temas.</p>
          </li>

          <li>
            <p>Los lineamientos de formato requerido para los documentos son los siguientes:</p>
              <ul>
                <li>
                  <p>Formato PDF</p>
                </li>
                <li>
                  <p>Tama??o carta</p>
                </li>
                <li>
                  <p>Portada del documento con t??tulo del trabajo, nombre del autor y logos pertinentes del proyecto</p>
                </li>
                <li>
                  <p>T??tulos en Arial Negrita tama??o 16</p>
                </li>
                <li>
                  <p>Subt??tulos en Arial tama??o 14</p>
                </li>
                <li>
                  <p>Contenido en Arial tama??o 12</p>
                </li>
                <li>
                  <p>Interlineado 1.5</p>
                </li>
                <li>
                  <p>M??rgenes a 2.5 cm por los cuatro lados</p>
                </li>
                <li>
                  <p>P??rrafo justificado</p>
                </li>
              </ul>
          </li>

          <li>
            <p>Si se desean subir dos o m??s trabajos acad??micos a revisi??n para su publicaci??n se deber?? rellenar la solicitud aqu?? presentada varias veces (una vez por cada trabajo).</p>
          </li>

          <li>
            <p>Si tu trabajo acad??mico es en formato audiovisual, o meramente audio, es necesario que primero lo subas a la plataforma de streaming Youtube, para que cuando rellenes la solicitud de publicaci??n ??nicamente adjuntes el link de dicho material.</p>
          </li>

          <li>
            <p>Adem??s del trabajo acad??mico, se requerir??n los siguientes elementos en la solicitud: Breve resumen del trabajo, nombre completo del autor, t??tulo del trabajo, y la carta de uso de contenidos.</p>
          </li>

          <li>
            <p>Te pedimos atentamente que antes de someter tu trabajo a revisi??n para publicaci??n lo leas varias veces y le hagas las correcciones pertinentes, esto con la intenci??n de que todos los contenidos presentados en la plataforma sean de la mayor calidad posible.</p>
          </li>

          <li>
            <p>Antes de proceder te pedimos que descargues la carta de uso de contenidos que estar?? disponible aqu?? debajo, para que la adjuntes en formato PDF en la solicitud de publicaci??n con los datos requeridos en ella (es esencial que tenga firma y nombre).</p>
            <Button onClick={downloadAgreementTemplate} variant="contained" color="primary" className='SubmitBtn'>Carta de uso</Button>
          </li>
        </ul>
        
        
        </Col>
        <Col>
        <h1 className='titles'>Formularios de publicaci??n</h1>

        <h2>Publicar un documento PDF</h2>
        <Form className='PublishForm' id='pdfForm' onSubmit={submitPDF}>
          <Form.Group >
            <Form.Label>T??tulo</Form.Label>
            <Form.Control required onChange={(e) => myFunction(e)} type="text" placeholder="Ingrese el t??tulo del documento" id='title' />
          </Form.Group>
          <Form.Group >
            <Form.Label>Autor</Form.Label>
            <Form.Control required onChange={(e) => myFunction(e)} type="text" placeholder="Ingrese el nombre completo del autor" id='author' />
          </Form.Group>
          <Form.Group >
            <Form.Label>Categor??a</Form.Label>
            <Form.Control required onChange={(e) => myFunction(e)} as="select" defaultValue="Elegir..." id='category'>
              <option>Elegir...</option>
              <option>Cr??tica</option>
              <option>Educaci??n</option>
              <option>Difusi??n</option>
              <option>Investigaci??n</option>
              <option>Otros</option>
            </Form.Control>
          </Form.Group>
          <Form.Group >
            <Form.Label>Resumen</Form.Label>
            <Form.Control required onChange={(e) => myFunction(e)} as="textarea" placeholder="Ingrese un peque??o resumen acerca del documento" id='abstract' />
          </Form.Group>
          
          <Form.Group >
            <Form.Label>Documento PDF</Form.Label>
            <Form.File required onChange={(e) => myFunction(e)}  id='document' />
          </Form.Group>
          
          <Form.Group >
            <Form.Label>Carta de uso de contenidos</Form.Label>
            <Form.File required onChange={(e) => myFunction(e)}  id='agreement' />
          </Form.Group>
          
          <Button variant="contained" color="primary" type="submit" className='SubmitBtn' >
            Enviar
        </Button>
        </Form>
                
        <h2>Publicar un material audiovisual</h2>
        <Form className='PublishForm' id='videoForm'onSubmit={submitVideo}>
          <Form.Group >
            <Form.Label>T??tulo</Form.Label>
            <Form.Control required onChange={(e) => myFunction(e)} type="text" placeholder="Ingrese el t??tulo del documento" id='title' />
          </Form.Group>
          <Form.Group >
            <Form.Label>Autor</Form.Label>
            <Form.Control required onChange={(e) => myFunction(e)} type="text" placeholder="Ingrese el nombre completo del autor" id='author' />
          </Form.Group>
          <Form.Group >
            <Form.Label>Categor??a</Form.Label>
            <Form.Control required onChange={(e) => myFunction(e)} as="select" defaultValue="Elegir..." id='category'>
              <option>Elegir...</option>
              <option>Cr??tica</option>
              <option>Educaci??n</option>
              <option>Difusi??n</option>
              <option>Investigaci??n</option>
              <option>Otros</option>
            </Form.Control>
          </Form.Group>
          <Form.Group >
            <Form.Label>Resumen</Form.Label>
            <Form.Control required onChange={(e) => myFunction(e)} as="textarea" placeholder="Ingrese un peque??o resumen acerca del material audiovisual" id='abstract' />
          </Form.Group>
          
          <Form.Group >
            <Form.Label>Link al material audiovisual</Form.Label>
            <Form.Control required onChange={(e) => myFunction(e)} type="text" placeholder="Ingrese el link al material audiovisual" id='videoLink' />
          </Form.Group>
          
          <Form.Group >
            <Form.Label>Carta de uso de contenidos</Form.Label>
            <Form.File required onChange={(e) => myFunction(e)}  id='agreement' />
          </Form.Group>
          
          <Button variant="contained" color="primary" type="submit" className='SubmitBtn' >
            Enviar
        </Button>
        </Form>


        </Col>
      </Row>
    </Container>
  )
}

export default Uploads;