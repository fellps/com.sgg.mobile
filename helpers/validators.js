export const Email = (email) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));

export const Name = (name) => (/^[a-zA-Z]+ [a-zA-Z]+$/.test(name));

export const Description = (description) => (description.replace(/ /g, "").length >= 200);

export const Phone = (phone) => {
    phone = phone.replace(/\D/g, '');
    if(phone.toString().length < 10) return false;
    return true; 
};

export const CPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
};

export const Birthdate = (date) => {
    try {
        var parts = date.split("/");
        var dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
        var dtCurrent = new Date();

        var diff = dtCurrent.getFullYear() - dtDOB.getFullYear()

        if (isNaN(diff) || diff < 18 || diff > 100) {
            return false;
        }
    
        if (diff == 18) {
            if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                return false;
            }
            if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                if (dtCurrent.getDate() < dtDOB.getDate()) {
                    return false;
                }
            }
        }
    
        return true;   
    } catch (error) {
        return false;
    }
};