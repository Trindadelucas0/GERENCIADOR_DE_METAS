const{select}=require('@inquirer/prompts')
const start =async () => {
    
    while(true){
    const opcao = await select({
        message: "menu >",
        choices:[
        {
            name:"cadastrar meta",
            value:"cadastrar"
        },
        {
            name:"listar metas",
            value: "listar"
        },
        {
            name:"sair",
            value:"sair"
        }
        ]
    })
        switch(opcao){
            case"cadastrar":
                console.log("vamos Cadastrar")
                break
            case "listar":
                console.log("vamos Listar")
                break
            case "sair":
                console.log("até a proxima")
            return
        }
    }


}
start()