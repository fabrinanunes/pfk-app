export function PrivacyPolicy(){

    return(
        <>
            <h1>Política de Privacidade</h1>
            <ul>Dados coletados: (somente com a finalidade de identificar o usuário)
                <li>email (para cadastro na plataforma)</li>
                <li>nome completo (para identificação)</li>
                <li>número do cartão de crédito criptografado (somente se o usuário optar por salvar o cartão), junto com a data de expiração e os 4 últimos dígitos</li>
            </ul>
            <p>Ao excluir seu perfil de forma permanente, os dados armazenados serão mantidos pelo período de 5 (cinco) anos, para fins judiciais. Após esse período, os dados do usuário serão permanentemente deletados do banco de dados da empresa</p>
            <p>A realização do pagamento do produto não ocorrerá por meio da Empresa, mas sim por meio de Gateway de  Pagamento (processador e facilitador de pagamento). Os dados bancários solicitados ficarão na posse desse Gateway de Pagamento, de modo que a Empresa só terá a informação se o pagamento foi efetuado com sucesso, ou não.</p>
        </>
    );
}
