const preencherFormulario = (endereco)=>{
        document.getElementById('city').value = endereco.localidade
        document.getElementById('district').value = endereco.bairro
        document.getElementById('state').value = endereco.uf
        document.getElementById('avenue').value = endereco.logradouro
}



const pesquisarCep = async() =>{
   const cep = document.getElementById('cep').value ;
   const url = `https://viacep.com.br/ws/${cep}/json/`
   const dados =await fetch(url)
   const endereco = await dados.json()
   console.log(preencherFormulario(endereco))
   if(endereco.hasOwnProperty('erro')){
        document.getElementById('city').value ='CEP não encontrado'
   }
   
else{ 
    preencherFormulario(endereco)
}}

document.getElementById('cep')
.addEventListener('focusout',pesquisarCep)