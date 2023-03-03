import { useState } from 'react';
import InputMask from 'react-input-mask';
import Footer from './components/Footer';
import Validator from './components/Validator';
import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode'
import './App.css'

function App() {

  const [whatsNumber, setWhatsNumber] = useState('')
  const [whatsMensagem, setWhatsMensagem] = useState('')
  const [geraLink, setGeraLink] = useState('')

  const [emptyNumber, setEmptyNumber] = useState(false)

  const [qrCodeLink, setQrCodeLink] = useState ('')

  function handleGenerate(link_url) {
    QRCodeLink.toDataURL(link_url, {
      width: 600,
      margin: 3,
    }, function (err, url) {
        setQrCodeLink(url);
    })
  }

  function gerarLink(e) {
    e.preventDefault()
    

    let whatsNumberEncoded = whatsNumber.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')

    if (whatsNumber === '')  {
      setEmptyNumber(true)

    } else if (whatsMensagem === '') {

      const url = 'https://wa.me/'
      let link = `${url}${whatsNumberEncoded}`
      setGeraLink(link)
      setEmptyNumber(false)
      handleGenerate(link)

    } else {

      const url = 'https://wa.me/'
      let whatsMensagemEncoded = encodeURIComponent(whatsMensagem)
      let link = `${url}${whatsNumberEncoded}?text=${whatsMensagemEncoded}`
      setGeraLink(link)
      handleGenerate(link)

    }

  }

 const [showSpan, setShowSpan] = useState(false)

  function copyLink(e) {
    navigator.clipboard.writeText(geraLink)
    setShowSpan(true)
  }


  return (
    <div className="App">
      <section>
        <main>
          <h1 className="title_main">Gerador de Links do WhatsApp</h1>
          <p className='desc_main'>Preencha os campos abaixo e obtenha seu link pronto para compartilhar.</p>

          <form>
          <div className="form_inner">
          
            <InputMask mask="55 (99) 99999-9999" maskChar={null} type='tel' placeholder='Número do Whatsapp' name='numero_whats' value={whatsNumber} onChange={e => setWhatsNumber (e.target.value)} />
            <input type='text' placeholder='Adcione uma mensagem de envio (Opcional)' value={whatsMensagem} onChange={(e) => setWhatsMensagem (e.target.value)} />
          </div>
          
          {emptyNumber && <Validator></Validator> } 

          <button type='submit' className='button button_primary' onClick={gerarLink}>Gerar Link</button>
        </form>

        <small>Nenhum dado informado será salvo.</small>

        {Object.keys(geraLink).length > 0  &&  (
        
        <div className='box_resultado'>
          <div className='box_resultado_inner'>
            <h1>Pronto! Copie o link e compartilhe!</h1>
            <p>Link completo para copiar:</p>
              <div className='link_gerado'>{geraLink}</div>
                <p>Ou utilize os comandos abaixo:</p>
                    <div className='other_commands'>
                      <button className='button button_secondary button_small' onClick={copyLink}>Copiar Link</button>
                      <a href={geraLink} className="button button_tertiary button_small" target='_blank' rel="noreferrer">Abrir no navegador</a>   
                    </div>
            {showSpan && <span className='copied'>Copiado</span> } 
          </div>

          <div className='box_resultado_inner'>
              <div className='qrcode'>
                <QRCode value={geraLink}></QRCode>
                
              </div>
          </div>

          <div className='box_resultado_inner'>
              <a href={qrCodeLink} download={`qrcode.png`} className='button button_secondary button_small'>Baixar QRCode</a>
          </div>
            
        </div>
        
        )}  

      </main>

        
      </section>
      
          
        <Footer></Footer>

    </div>
  );
}

export default App;
