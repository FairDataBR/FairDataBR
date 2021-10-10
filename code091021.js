// @ts-check

const myMap = new Map()
const eventsMap = new Map()
let isTouch = false

function atualizaMap () {
  const radiobox = document.querySelectorAll('input[type="radio"]:checked')
  myMap.clear()
  for (let i = 0; i < radiobox.length; i++) {
    myMap.set(radiobox[i].name, parseInt(radiobox[i].value))
  }
}

function valida (media) {
  atualizaMap()
  const radiobox = document.querySelectorAll('input[type="radio"]')

  if ((myMap.get('f3') != null || myMap.get('f4') != null || myMap.get('a3') != null) && (myMap.get('f1') <= 1)) {
    return 0
  }
  if ((myMap.get('a7') != null && (myMap.get('a1') <= 1 || (myMap.get('f2') <= 1)))) {
    return 0
  }
  if ((myMap.get('a1') != null || myMap.get('a4') != null || myMap.get('a3') != null || myMap.get('i3') != null || myMap.get('i4') != null || myMap.get('r4') != null || myMap.get('r6') != null || myMap.get('f3') != null) && ((myMap.get('f2') <= 1) || (myMap.get('f2') == null))) {
    return 0
  }
  for (let i = 0; i < radiobox.length; i++) {
    if ((radiobox[i].required) && (myMap.get(radiobox[i].name) == null)) {
      return 0
    }
  }
  return media
}

function mediafair () {
  let somatorio = 0
  let media = 0
  let cont = 0
  for (let i = 0; i < arguments.length; i++) {
    if (document.getElementById(arguments[i]) != null) {
      cont++
    }
    if (myMap.get(arguments[i]) != null) {
      somatorio += myMap.get(arguments[i])
    }
  }
  media = (somatorio / cont)
  return valida(media)
}

function limparCalculo () {
  document.getElementById('fr').value = '0'
  document.querySelector('#nfindable > h2').innerText = '0'
  document.getElementById('ar').value = '0'
  document.querySelector('#naccessible > h2').innerText = '0'
  document.getElementById('ir').value = '0'
  document.querySelector('#ninteroperable > h2').innerText = '0'
  document.getElementById('rr').value = '0'
  document.querySelector('#nreusable > h2').innerText = '0'
  document.getElementById('mr').value = '0'
  document.querySelector('#nmedia > h2').innerText = '0'
  document.getElementsByTagName('circle')[1].style.strokeDashoffset = '0'
  document.getElementsByTagName('circle')[3].style.strokeDashoffset = '0'
  document.getElementsByTagName('circle')[5].style.strokeDashoffset = '0'
  document.getElementsByTagName('circle')[7].style.strokeDashoffset = '0'
  document.getElementsByTagName('circle')[9].style.strokeDashoffset = '0'
  document.getElementById('me').innerHTML = 'Clique em Calcular Pontuação'
}

function atribueNota (fr, ar, ir, rr, mr) {
  document.getElementById('me').innerHTML = 'Iniciando Calculo'
  limparCalculo()
  document.getElementById('fr').value = fr
  document.querySelector('#nfindable > h2').innerText = fr
  document.getElementById('ar').value = ar
  document.querySelector('#naccessible > h2').innerText = ar
  document.getElementById('ir').value = ir
  document.querySelector('#ninteroperable > h2').innerText = ir
  document.getElementById('rr').value = rr
  document.querySelector('#nreusable > h2').innerText = rr
  document.getElementById('mr').value = mr
  document.querySelector('#nmedia > h2').innerText = mr
  document.getElementById('me').innerHTML = 'Pontuação Calculada'
  document.getElementsByTagName('circle')[1].style.strokeDashoffset = (440 - (440 * Number(fr * 10) / 100)).toString()
  document.getElementsByTagName('circle')[3].style.strokeDashoffset = (440 - (440 * Number(ar * 10) / 100)).toString()
  document.getElementsByTagName('circle')[5].style.strokeDashoffset = (440 - (440 * Number(ir * 10) / 100)).toString()
  document.getElementsByTagName('circle')[7].style.strokeDashoffset = (440 - (440 * Number(rr * 10) / 100)).toString()
  document.getElementsByTagName('circle')[9].style.strokeDashoffset = (440 - (440 * Number(mr * 10) / 100)).toString()
}

function calcular (a = true) {
  const fr = mediafair('f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8')
  const ar = mediafair('a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7')
  const ir = mediafair('i1', 'i2', 'i3', 'i4')
  const rr = mediafair('r1', 'r2', 'r3', 'r4', 'r5', 'r6')
  if ((fr !== '0') && (ar !== '0') && (ir !== '0') && (rr !== '0')) {
    let mr = (fr).toFixed(2) * 1 + (ar).toFixed(2) * 1 + (ir).toFixed(2) * 1 + (rr).toFixed(2) * 1
    mr = (mr / 4)
    if (a) {
      atribueNota(fr.toFixed(2), ar.toFixed(2), ir.toFixed(2), rr.toFixed(2), mr.toFixed(2))
      if (document.getElementById('fairplus') != null) {
        document.getElementById('fairplus').classList.remove('invisible')
      }
    }
    return mr.toFixed(2)
  }
  return false
}

function ativarF3 () {
  if ((myMap.get('f1') > 1) && (myMap.get('f2') > 1)) {
    document.getElementById('f3a').required = true
    document.getElementById('f3b').required = true
    document.getElementById('sf3').innerHTML = '*'
    document.getElementById('sf3').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('f3').style.opacity = 'revert'
    document.getElementById('tf3').removeAttribute('data-bs-original-title')
    document.getElementById('tf3').removeAttribute('title')
    document.getElementById('a3a').required = true
    document.getElementById('a3b').required = true
    document.getElementById('sa3').innerHTML = '*'
    document.getElementById('sa3').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('a3').style.opacity = 'revert'
    document.getElementById('ta3').removeAttribute('data-bs-original-title')
    document.getElementById('ta3').removeAttribute('title')
  }
}

function desativarF3 () {
  if (myMap.get('f1') <= 1 || myMap.get('f1') == null || myMap.get('f2') <= 1 || myMap.get('f2') == null) {
    const title = 'Para ativar, responda a pergunta F1 com uma resposta diferente de "Sem identificador" e responda a pergunta F2 com uma resposta diferente de "Sem Metadados"'
    document.getElementById('tf3').title = title
    document.getElementById('f3').style.opacity = '0.65'
    document.getElementById('f3a').required = false
    document.getElementById('f3b').required = false
    document.getElementById('sf3').innerHTML = ''
    document.getElementById('f3a').checked = false
    document.getElementById('f3b').checked = false
    document.getElementById('ta3').title = title
    document.getElementById('a3').style.opacity = '0.65'
    document.getElementById('a3a').required = false
    document.getElementById('a3b').required = false
    document.getElementById('sa3').innerHTML = ''
    document.getElementById('a3a').checked = false
    document.getElementById('a3b').checked = false
  }
}

function a1Ativar (event) {
  if (myMap.get('a1') > 1 && myMap.get('f2')) {
    document.getElementById('ta7').removeAttribute('data-bs-original-title')
    document.getElementById('ta7').removeAttribute('title')
    document.getElementById('a7a').required = true
    document.getElementById('a7b').required = true
    document.getElementById('a7').style.opacity = 'revert'
    document.getElementById('sa7').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('sa7').innerHTML = '*'
  }
}

function a1Desativar () {
  if (myMap.get('a1') === 1 || myMap.get('a1') == null) {
    const title = 'Para ativar, responda a pergunta A1 com uma resposta diferente de "Sem acesso a dados ou metadados"'
    document.getElementById('a7a').required = false
    document.getElementById('a7b').required = false
    document.getElementById('sa7').innerHTML = ''
    document.getElementById('ta7').title = title
    document.getElementById('a7').style.opacity = '0.65'
    document.getElementById('a7a').checked = false
    document.getElementById('a7b').checked = false
  }
}

function f1Ativar (event) {
  if (myMap.get('f1') > 1) {
    document.getElementById('tf4').removeAttribute('data-bs-original-title')
    document.getElementById('tf4').removeAttribute('title')
    document.getElementById('f4a').required = true
    document.getElementById('f4b').required = true
    document.getElementById('sf4').innerHTML = '*'
    document.getElementById('sf4').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('f4').style.opacity = 'revert'
  }
}

function f1Desativar () {
  if (myMap.get('f1') === 1 || myMap.get('f1') == null) {
    const title = 'Para ativar, responda a pergunta F1 com uma resposta diferente de "Sem identificador"'
    document.getElementById('tf4').title = title
    document.getElementById('f4a').required = false
    document.getElementById('f4b').required = false
    document.getElementById('sf4').innerHTML = ''
    document.getElementById('f4a').checked = false
    document.getElementById('f4b').checked = false
    document.getElementById('tf3').title = title
    document.getElementById('f4').style.opacity = '0.65'
  }
}

function f2Ativar (event) {
  if (myMap.get('f2') > 1) {
    document.getElementById('ta1').removeAttribute('data-bs-original-title')
    document.getElementById('ta1').removeAttribute('title')
    document.getElementById('sa1').innerHTML = '*'
    document.getElementById('sa1').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('ta4').removeAttribute('data-bs-original-title')
    document.getElementById('ta4').removeAttribute('title')
    document.getElementById('sa4').innerHTML = '*'
    document.getElementById('sa4').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('ti3').removeAttribute('data-bs-original-title')
    document.getElementById('ti3').removeAttribute('title')
    document.getElementById('si3').innerHTML = '*'
    document.getElementById('si3').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('ti4').removeAttribute('data-bs-original-title')
    document.getElementById('ti4').removeAttribute('title')
    document.getElementById('si4').innerHTML = '*'
    document.getElementById('si4').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('tr4').removeAttribute('data-bs-original-title')
    document.getElementById('tr4').removeAttribute('title')
    document.getElementById('sr4').innerHTML = '*'
    document.getElementById('sr4').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('tr6').removeAttribute('data-bs-original-title')
    document.getElementById('tr6').removeAttribute('title')
    document.getElementById('sr6').innerHTML = '*'
    document.getElementById('sr6').ariaLabel = 'Pergunta Obrigatória'
    document.getElementById('a1a').required = true
    document.getElementById('a1b').required = true
    document.getElementById('a1c').required = true
    document.getElementById('a1d').required = true
    document.getElementById('a4a').required = true
    document.getElementById('a4b').required = true
    document.getElementById('a4c').required = true
    document.getElementById('i3a').required = true
    document.getElementById('i3b').required = true
    document.getElementById('i4a').required = true
    document.getElementById('i4b').required = true
    document.getElementById('i4c').required = true
    document.getElementById('i4d').required = true
    document.getElementById('r4a').required = true
    document.getElementById('r4b').required = true
    document.getElementById('r6a').required = true
    document.getElementById('r6b').required = true
    document.getElementById('r6c').required = true
    document.getElementById('r6d').required = true
    document.getElementById('a1').style.opacity = 'revert'
    document.getElementById('a4').style.opacity = 'revert'
    document.getElementById('i3').style.opacity = 'revert'
    document.getElementById('i4').style.opacity = 'revert'
    document.getElementById('r4').style.opacity = 'revert'
    document.getElementById('r6').style.opacity = 'revert'
  }
}

function f2Desativar () {
  if (myMap.get('f2') === 1 || myMap.get('f2') == null) {
    const title = 'Para ativar, responda a pergunta F2 com uma resposta diferente de "Sem Metadados"'
    document.getElementById('ta1').title = title
    document.getElementById('a1a').checked = false
    document.getElementById('a1b').checked = false
    document.getElementById('a1c').checked = false
    document.getElementById('a1d').checked = false
    document.getElementById('a1a').required = false
    document.getElementById('a1b').required = false
    document.getElementById('a1c').required = false
    document.getElementById('a1d').required = false
    document.getElementById('ta4').title = title
    document.getElementById('a4a').required = false
    document.getElementById('a4b').required = false
    document.getElementById('a4c').required = false
    document.getElementById('a4a').checked = false
    document.getElementById('a4b').checked = false
    document.getElementById('a4c').checked = false
    document.getElementById('ti3').title = title
    document.getElementById('i3a').required = false
    document.getElementById('i3b').required = false
    document.getElementById('i3a').checked = false
    document.getElementById('i3b').checked = false
    document.getElementById('ti4').title = title
    document.getElementById('i4a').required = false
    document.getElementById('i4b').required = false
    document.getElementById('i4c').required = false
    document.getElementById('i4d').required = false
    document.getElementById('i4a').checked = false
    document.getElementById('i4b').checked = false
    document.getElementById('i4c').checked = false
    document.getElementById('i4d').checked = false
    document.getElementById('tr4').title = title
    document.getElementById('r4a').required = false
    document.getElementById('r4b').required = false
    document.getElementById('r4a').checked = false
    document.getElementById('r4b').checked = false
    document.getElementById('tr6').title = title
    document.getElementById('r6a').required = false
    document.getElementById('r6b').required = false
    document.getElementById('r6c').required = false
    document.getElementById('r6d').required = false
    document.getElementById('r6a').checked = false
    document.getElementById('r6b').checked = false
    document.getElementById('r6c').checked = false
    document.getElementById('r6d').checked = false
    document.getElementById('sa1').innerHTML = ''
    document.getElementById('sa4').innerHTML = ''
    document.getElementById('si3').innerHTML = ''
    document.getElementById('si4').innerHTML = ''
    document.getElementById('sr4').innerHTML = ''
    document.getElementById('sr6').innerHTML = ''
    document.getElementById('sa1').innerHTML = ''
    document.getElementById('sa4').innerHTML = ''
    document.getElementById('a1').style.opacity = '0.65'
    document.getElementById('a4').style.opacity = '0.65'
    document.getElementById('i3').style.opacity = '0.65'
    document.getElementById('i4').style.opacity = '0.65'
    document.getElementById('r4').style.opacity = '0.65'
    document.getElementById('r6').style.opacity = '0.65'
  }
}

function atualizaEnabledDisabled () {
  const radiobox = document.querySelectorAll('input[type="radio"]:checked')
  for (let i = 0; i < radiobox.length; i++) {
    if (radiobox[i].required) {
      radiobox[i].disabled = false
      radiobox[i].ariarequired = false
    } else {
      radiobox[i].disabled = true
      radiobox[i].ariarequired = true
    }
  }
}
function atualizaAriaChecked () {
  const radiobox = document.querySelectorAll('input[type="radio"]')
  for (let i = 0; i < radiobox.length; i++) {
    if (radiobox[i].checked) {
      radiobox[i].ariaChecked = true
    } else {
      radiobox[i].ariaChecked = false
    }
  }
}
function preenche () {
  const x = qs
  const radiobox = document.querySelectorAll('input[type="radio"]')
  for (let i = 0; i < radiobox.length; i++) {
    if (radiobox[i].value === x[radiobox[i].name]) {
      document.getElementById(radiobox[i].id).checked = true
    }
  }
}

const qs = (function (a) {
  const b = {}
  for (let i = 0; i < a.length; ++i) {
    const p = a[i].split('=', 2)
    if (p.length === 1) {
      b[p[0]] = ''
    } else {
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '))
    }
  }
  return b
})(window.location.search.substr(1).split('&'))

function checagem () {
  if (myMap.size > 0) {
    atualizaMap()
    f1Ativar()
    atualizaMap()
    f2Ativar()
    atualizaMap()
    ativarF3()
    atualizaMap()
    a1Ativar()
    atualizaMap()
    f1Desativar()
    atualizaMap()
    f2Desativar()
    atualizaMap()
    desativarF3()
    atualizaMap()
    a1Desativar()
    atualizaMap()
    atualizaEnabledDisabled()
    atualizaAriaChecked()
    atualizaToolTip()
  }
}

const someFunction = function (event) {
  atualizaToolTip()
  atualizaMap()
  checagem()
  document.getElementById('qrc').innerText = ''
  try {
    gerarQrcode()
  } catch (e) {
    console.log('não foi possível gerar o qrcode')
  }
  if (document.getElementById('mr').value !== calcular(false)) {
    limparCalculo()
  }
}

function setTouch () {
  isTouch = true
}

document.addEventListener('DOMContentLoaded', function (event) {
  const elements = document.getElementsByClassName('tooltiptext')
  preenche()
  gerarQrcode()
  someFunction()
  window.addEventListener('click', someFunction, false)
  window.addEventListener('Keydown', someFunction, false)
  document.getElementById('11yQrcode').addEventListener('click', qrcodeOpen, false)
  document.getElementById('11yQrcode').addEventListener('onkeydown', qrcodeOpen, false)
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', esconderDicaObrigatoria, false)
    elements[i].addEventListener('click', esconderDica, false)
    if (isTouch) {
      elements[i].addEventListener('touchstart', esconderDicaObrigatoria, false)
    }
  }
  if (isTouch === false) {
    window.addEventListener('touchstart', setTouch)
  }
  if (document.getElementById('me').innerHTML === 'Pontuação Calculada') {
    window.location.hash = '#dashboard'
  } else {
    if (myMap.size > 0) {
      window.location.hash = '#findable'
    }
  }
})

function geraurl () {
  let prefix = 'https://wrco.ufpb.br'
  if (window.location.pathname === '/fair/') {
    prefix = prefix + '/fair/index.html'
  } else {
    prefix = prefix + window.location.pathname
  }
  if (myMap.size > 0) {
    prefix = prefix + '?'
    for (const [key, value] of myMap) {
      prefix = prefix + key + '=' + value + '&'
    }
    return prefix.substr(0, (prefix.length - 1))
  }
  return prefix
}

const qrcodeOpen = function (event) {
  window.open(geraurl())
}

function copia () {
  window.open(geraurl().replace('index', 'fair+'))
}

function gerarQrcode () {
  let svgElement = document.createElement('div'),
    u = geraurl(),
    s = QRCode.generateSVG(u, {
    })
  svgElement.appendChild(s)
  document.getElementById('qrc').appendChild(svgElement)
}

function atualizaToolTip () {
  const dica = document.getElementsByClassName('tooltip-inner')
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

const esconderDica = function (event) {
  const dica = document.getElementsByClassName('tooltip-inner')
  if (eventsMap.get(event.target.uidEvent)) {
    for (let i = 0; i < dica.length; i++) {
      if (dica[i].innerText.slice(0, 11) !== 'Para ativar') {
        dica[i].style.display = 'none'
      }
    }
    eventsMap.clear()
  }
  eventsMap.set(event.target.uidEvent, 'tooltip')
  if (eventsMap.size > 1) {
    eventsMap.clear()
  }
  atualizaToolTip()
}

const esconderDicaObrigatoria = function (event) {
  const dica = document.getElementsByClassName('tooltip-inner')
  for (let i = 0; i < dica.length; i++) {
    if (dica[i].innerText.slice(0, 11) === 'Para ativar') {
      dica[i].style.display = 'none'
    }
  }
  atualizaToolTip()
}
