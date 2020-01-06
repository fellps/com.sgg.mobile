import axios from 'axios'

export const getStates = async () => axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
export const getCities = async ({ id }) => axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/microrregioes`)
export const getAddressFromCep = async ({ cep }) => {
  if (cep.length < 8) throw new Error('SEND_A_VALID_CEP')

  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

  if (data.erro) throw new Error('CEP_NOT_FOUND')

  return {
    address: data.logradouro,
    cep: data.cep,
    bairro: data.bairro,
    city: data.localidade,
    state: data.uf
  }
}
