const { select, input, checkbox } = require("@inquirer/prompts");
let meta = {
  value: "Tomar 3L de agua por dia",
  checked: false,
};
let mensagem="Bem vindo ao App de Metas"
let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:" });
  if (meta.length == 0) {
    mensagem="A meta não pode ser vazia.";
    return;
  }

  metas.push({ value: meta, checked: false }
  );
  mensagem="Meta cadastrada com sucesso!!"
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
    mensagem="Nenhuma meta selecionada";
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });
    meta.checked = true;
  });
  mensagem="Meta[s] marcada[s] como concluida[s]";
};

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });
  if (realizadas.length == 0) {
    mensagem="Não existem metas realizadas! :(";
    return;
  }
  await select({
    message: "Metas realizadas" + realizadas.length,
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return meta.checked != true;
  });
  if (abertas.length == 0) {
    mensagem="Não existem metas abertas! :)";
    return;
  }
  await select({
    message: "Metas Abertas" + abertas.length,
    choices: [...abertas],
  });
};

const deletarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  });
  const itemsADeletar = await checkbox({
    message: "Selecione item para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  });
  if (itemsADeletar.length == 0) {
    mensagem="Nenhum Item para deletar";
    return;
  }
  itemsADeletar.forEach((item)=>{
  metas=   metas.filter((meta)=>{
        return meta.value != item
    })
  })
 mensagem="Meta(s) deletada(s) com sucesso"
};

const mostrarMensagem =()=>{
    console.clear();
    if(mensagem!= ""){
        console.log(mensagem)
        console.log("")
        mensagem=""
    }
}

const start = async () => {
  //menu de aplicação

  while (true) {
    mostrarMensagem()
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
          name: "Metas Abertas",
          value: "Abertas",
        },
        {
          name: "Deletar Metas",
          value: "Deletar",
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
        break;
      case "Listar":
        await listarMetas();
        break;
      case "realizadas":
        await metasRealizadas();
        break;
      case "Abertas":
        await metasAbertas();
        break;
      case "Deletar":
        await deletarMetas();
        break;
      case "Sair":
        console.log("Até a proxima");
        return;
    }
  }
};
start();
