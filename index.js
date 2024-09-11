const { select, input, checkbox } = require("@inquirer/prompts");
let meta = {
  value: "tomar 3L de agua por dia",
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
    instructions:false,
  }); //processar dados
  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada");
    return;
  }
  metas.forEach((m)=>{
    m.checked=false
  })


  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });
    meta.checked = true;
  });
  console.log("meta[s] marcadas como concluida[s]")
};

const start = async () => {
  //menu de aplicação

  while (true) {
    const opcao = await select({
      message: "menu >",
      choices: [
        {
          name: "cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "listar metas",
          value: "listar",
        },
        {
          name: "sair",
          value: "sair",
        },
      ],
    });
    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        console.log(metas);
        break;
      case "listar":
        await listarMetas();
        break;
      case "sair":
        console.log("até a proxima");
        return;
    }
  }
};
start();
