export const Phone = (phone) => {
    phone = phone.replace(/\D/g,"");
    phone = phone.replace(/^(\d{2})(\d)/g,"($1) $2");
    phone = phone.replace(/(\d)(\d{4})$/,"$1-$2");
    return phone;
}

export const CPF = (cpf) => {
    cpf = cpf.replace(/\D/g,"");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return cpf;
}

export const Date = (date) => {
    date = date.replace(/\D/g,""); 
    date = date.replace(/(\d{2})(\d)/,"$1/$2"); 
    date = date.replace(/(\d{2})(\d)/,"$1/$2"); 
    return date;
}

export const Cep = (cep) => {
    cep = cep.replace(/\D/g,""); 
    cep = cep.replace(/(\d{5})(\d)/,"$1-$2")
    return cep;
}