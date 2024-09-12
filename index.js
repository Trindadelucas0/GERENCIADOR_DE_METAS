const { select, input, checkbox } = require("@inquirer/prompts");
let meta = {
  value: "Tomar 3L de agua por dia",
  checked: false,
};
let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:" });
  if (meta.length == 0) {
    console.log("A meta não pode ser vazia.");
    return;
  }

  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
  //coleta de dado
  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o ENTER para finalizar essa etapa",
    choices: [...metas],
    instructions: false,
  }); //processar dados
  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada");
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });
    meta.checked = true;
  });
  console.log("Meta[s] marcadas como concluida[s]");
};

const metasRealizadas= async()=>{
    const realizadas = metas.filter((meta)=>{
        return meta.checked
    })
    if (realizadas.length==0){
        console.log("Não existem metas realizadas! :(")
        return

    }
    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })
}

const start = async () => {
  //menu de aplicação

  while (true) {
    const opcao = await select({
      message: "menu >",
      choices: [
        {
          name: "Cadastrar Meta",
          value: "Cadastrar",
        },
        {
            name: "Listar Metas",
            value: "Listar",
          },
        {
          name: "Metas realizadas",
          value: "realizadas",
        },
        {
          name: "Sair",
          value: "Sair",
        },
      ],
    });
    switch (opcao) {
      case "Cadastrar":
        await cadastrarMeta();
        console.log(metas);
        break;
      case "Listar":
        await listarMetas();
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "Sair":
        console.log("Até a proxima");
        return;
    }
  }
};
start();
