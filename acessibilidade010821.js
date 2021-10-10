// @ts-check

const darkLight = function (event) {
  const body = document.querySelector('body')
  const table = document.querySelectorAll('table')
  const li = document.querySelectorAll('li')
  const legend = document.querySelectorAll('legend')
  const a = document.querySelectorAll('a')
  const card = document.getElementsByClassName('card')
  const caption = document.querySelectorAll('caption')
  const principios = document.getElementsByClassName('principios')
  const obrigatorio = document.getElementsByClassName('obrigatorio')
  body.classList.toggle('active')
  document.getElementById('menu').classList.toggle('active')

  for (let i = 0; i < table.length; ++i) {
    table[i].classList.toggle('active')
  }

  for (let i = 0; i < li.length; ++i) {
    li[i].classList.toggle('active')
  }

  for (let i = 0; i < legend.length; ++i) {
    legend[i].classList.toggle('active')
  }

  for (let i = 0; i < card.length; ++i) {
    card[i].classList.toggle('active')
  }

  for (let i = 0; i < a.length; ++i) {
    a[i].classList.toggle('active')
  }

  for (let i = 0; i < principios.length; ++i) {
    principios[i].classList.toggle('active')
  }

  for (let i = 0; i < caption.length; ++i) {
    caption[i].classList.toggle('active')
  }

  for (let i = 0; i < obrigatorio.length; ++i) {
    obrigatorio[i].classList.toggle('active')
  }

  if (body.classList.contains('active')) {
    setLogo()
    document.getElementsByTagName('body')[0].style.backgroundColor = '#1c1c1b'
  } else {
    unsetLogo()
    document.getElementsByTagName('body')[0].style.backgroundColor = ' #fefefc'
  }

  if (window.sessionStorage.getItem('acessibilidade') === 'true') {
    window.sessionStorage.setItem('darkmode', document.getElementById('flexSwitchCheckDefault').checked.toString())
  }
}

function mudarTamFonte (size, sizetable) {
  document.body.style.fontSize = size
  const table = document.querySelectorAll('table')
  const legend = document.querySelectorAll('legend')
  const label = document.querySelectorAll('label')
  const colunaCard = document.getElementsByClassName('column')
  for (let i = 0; i < colunaCard.length; i++) {
    if (size === 'inherit') {
      colunaCard[i].style.height = '570px'
    }
    if (size === '24px') {
      colunaCard[i].style.height = '1250px'
    }
    if (size === '12px') {
      colunaCard[i].style.height = '380px'
    }
  }
  for (let i = 0; i < table.length; i++) {
    table[i].style.fontSize = sizetable
  }

  for (let i = 0; i < legend.length; i++) {
    legend[i].style.fontSize = size
  }

  for (let i = 0; i < label.length; i++) {
    label[i].style.fontSize = size
  }
  if (document.getElementsByClassName('introduction')[0]) {
    document.getElementsByClassName('introduction')[0].style.fontSize = size
  }
  if (window.sessionStorage.getItem('acessibilidade') === 'true') {
    window.sessionStorage.setItem('tamfonte', size)
    window.sessionStorage.setItem('tamtable', sizetable)
  }
}

function setLogo () {
  const logosMap = new Map()
  logosMap.set(document.getElementById('brandTimbu'), 'img/HorizontalFairDataBR-Negativo.svg')
  logosMap.set(document.getElementById('gitHub'), 'img/GitHub_Logo_White.png')
  for (const [key, value] of logosMap) {
    (key != null) ? (key.src = value) : false
  }
}

function unsetLogo () {
  const logosMap = new Map()
  logosMap.set(document.getElementById('brandTimbu'), 'img/HorizontalFairDataBR.svg')
  logosMap.set(document.getElementById('gitHub'), 'img/GitHub_Logo.png')
  for (const [key, value] of logosMap) {
    key != null ? key.src = value : false
  }
}

function salvar () {
  if (document.getElementById('accessibility1').checked) {
    window.sessionStorage.setItem('acessibilidade', 'true')
    window.sessionStorage.setItem('darkmode', document.getElementById('flexSwitchCheckDefault').checked.toString())
  } else {
    try {
      window.sessionStorage.clear()
    } catch (error) {
      window.alert('Não foi possível limpar sua sessão, feche o navegador e reabra para destruí-la, se o erro persistir atualize o navegador para uma versão mais atual')
    }
  }
}

function setAcessibilidade () {
  if (window.sessionStorage.getItem('tamfonte')) {
    mudarTamFonte(window.sessionStorage.getItem('tamfonte'), window.sessionStorage.getItem('tamtable'))
  }
  if ((window.sessionStorage.getItem('darkmode')) === 'true') {
    document.getElementById('flexSwitchCheckDefault').checked = true
    darkLight()
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('flexSwitchCheckDefault').addEventListener('change', darkLight, false)
  if (window.sessionStorage.getItem('acessibilidade') === 'true') {
    if (document.getElementById('accessibility1') != null) {
      document.getElementById('accessibility1').checked = true
    }
    setAcessibilidade()
  }
})
