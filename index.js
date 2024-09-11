const{select,input}=require('@inquirer/prompts')

const cadastrarMeta=async()=>{
    const meta =await input({message:"Digite a meta:"})
    if(meta.length == 0){
        console.log("A meta não pode ser vazia.")
        return
    }


}








const start =async () => { //menu de aplicação
    
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
              await cadastrarMeta()
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