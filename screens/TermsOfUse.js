import React , {Component} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import _ from 'lodash';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

class TermsAndConditions extends Component {

  state = {
    accepted: false
  }

  async componentDidMount() {
    const { navigation } = this.props;

    const loggedUserCookie = await AsyncStorage.getItem('loggedUser')
    const termsofuse = await AsyncStorage.getItem('termsofuse')

    const loggedUser = JSON.parse(loggedUserCookie)

    console.log('loggedUser', loggedUser)
    console.log('termsofuse', termsofuse)

    if (!_.isEmpty(loggedUser) && !_.isEmpty(loggedUser.token)) {
      console.log('entrou $$$$$$$$$$$$$$$$$$$$$$$$$')

      if (loggedUser.user.data.IdUserStatus === 5) {
        navigation.navigate("UploadDocuments");
      } else if (loggedUser.user.data.IdUserStatus === 1) {
        navigation.navigate("Home");
      }
    } else if (termsofuse == "clicked") {
      console.log('entrou *****************************')
      navigation.navigate("Onboarding");
    }
  }

  render(){
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>POLÍTICA DE PRIVACIDADE</Text>
        <ScrollView 
          style={styles.tcContainer}
          onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                this.setState({
                    accepted: true
                })
              }
            }}
          >
            <Text style={styles.tcT}>1. Informações gerais</Text>
            <Text style={styles.tcP}>A presente Política de Privacidade contém informações a respeito do modo como tratamos, total ou parcialmente, de forma automatizada ou não, os dados pessoais dos usuários que acessam nosso aplicativo. Seu objetivo é esclarecer os interessados acerca dos tipos de dados que são coletados, dos motivos da coleta e da forma como o usuário poderá atualizar, gerenciar ou excluir estas informações.</Text>
            <Text style={styles.tcP}>Esta Política de Privacidade foi elaborada em conformidade com a Lei Federal n. 12.965 de 23 de abril de 2014 (Marco Civil da Internet), com a Lei Federal n. 13.709, de 14 de agosto de 2018 (Lei de Proteção de Dados Pessoais) e com o Regulamento UE n. 2016/679 de 27 de abril de 2016 (Regulamento Geral Europeu de Proteção de Dados Pessoais - RGDP).</Text>
            <Text style={styles.tcP}>Esta Política de Privacidade poderá ser atualizada em decorrência de eventual atualização normativa, razão pela qual se convida o usuário a consultar periodicamente esta seção.</Text>
            <Text style={styles.tcT}>2. Direitos do usuário</Text>
            <Text style={styles.tcP}>O aplicativo se compromete a cumprir as normas previstas no RGPD, em respeito aos seguintes princípios:</Text>
            <Text style={styles.tcP}>- Os dados pessoais do usuário serão processados de forma lícita, leal e transparente (licitude, lealdade e transparência);</Text>
            <Text style={styles.tcP}>- Os dados pessoais do usuário serão coletados apenas para finalidades determinadas, explícitas e legítimas, não podendo ser tratados posteriormente de uma forma incompatível com essas finalidades (limitação das finalidades);</Text>
            <Text style={styles.tcP}>- Os dados pessoais do usuário serão coletados de forma adequada, pertinente e limitada às necessidades do objetivo para os quais eles são processados (minimização dos dados);</Text>
            <Text style={styles.tcP}>- Os dados pessoais do usuário serão exatos e atualizados sempre que necessário, de maneira que os dados inexatos sejam apagados ou retificados quando possível (exatidão);</Text>
            <Text style={styles.tcP}>- Os dados pessoais do usuário serão conservados de uma forma que permita a identificação dos titulares dos dados apenas durante o período necessário para as finalidades para as quais são tratados (limitação da conservação);</Text>
            <Text style={styles.tcP}>- Os dados pessoais do usuário serão tratados de forma segura, protegidos do tratamento não autorizado ou ilícito e contra a sua perda, destruição ou danificação acidental, adotando as medidas técnicas ou organizativas adequadas (integridade e confidencialidade).</Text>
            <Text style={styles.tcP}>O usuário do aplicativo possui os seguintes direitos, conferidos pela Lei de Proteção de Dados Pessoais e pelo RGPD:</Text>
            <Text style={styles.tcP}>- Direito de confirmação e acesso: é o direito do usuário de obter do aplicativo a confirmação de que os dados pessoais que lhe digam respeito são ou não objeto de tratamento e, se for esse o caso, o direito de acessar os seus dados pessoais;</Text>
            <Text style={styles.tcP}>- Direito de retificação: é o direito do usuário de obter do aplicativo, sem demora injustificada, a retificação dos dados pessoais inexatos que lhe digam respeito;</Text>
            <Text style={styles.tcP}>- Direito à eliminação dos dados (direito ao esquecimento): é o direito do usuário de ter seus dados apagados do aplicativo;</Text>
            <Text style={styles.tcP}>- Direito à limitação do tratamento dos dados: é o direito do usuário de limitar o tratamento de seus dados pessoais, podendo obtê-la quando contesta a exatidão dos dados, quando o tratamento for ilícito, quando o aplicativo não precisar mais dos dados para as finalidades propostas e quando tiver se oposto ao tratamento dos dados e em caso de tratamento de dados desnecessários;</Text>
            <Text style={styles.tcP}>- Direito de oposição: é o direito do usuário de, a qualquer momento, se opor por motivos relacionados com a sua situação particular, ao tratamento dos dados pessoais que lhe digam respeito, podendo se opor ainda ao uso de seus dados pessoais para definição de perfil de marketing (profiling);</Text>
            <Text style={styles.tcP}>- Direito de portabilidade dos dados: é o direito do usuário de receber os dados pessoais que lhe digam respeito e que tenha fornecido ao aplicativo, num formato estruturado, de uso corrente e de leitura automática, e o direito de transmitir esses dados a outro aplicativo;</Text>
            <Text style={styles.tcP}>- Direito de não ser submetido a decisões automatizadas: é o direito do usuário de não ficar sujeito a nenhuma decisão tomada exclusivamente com base no tratamento automatizado, incluindo a definição de perfis (profiling), que produza efeitos na sua esfera jurídica ou que o afete significativamente de forma similar.</Text>
            <Text style={styles.tcP}>O usuário poderá exercer os seus direitos por meio de comunicação escrita enviada ao aplicativo com o assunto "RGDP-", especificando:</Text>
            <Text style={styles.tcP}>- Nome completo ou razão social, número do CPF (Cadastro de Pessoas Físicas, da Receita Federal do Brasil) ou CNPJ (Cadastro Nacional de Pessoa Jurídica, da Receita Federal do Brasil) e endereço de e-mail do usuário e, se for o caso, do seu representante;</Text>
            <Text style={styles.tcP}>- Direito que deseja exercer junto ao aplicativo;</Text>
            <Text style={styles.tcP}>- Data do pedido e assinatura do usuário;</Text>
            <Text style={styles.tcP}>- Todo documento que possa demonstrar ou justificar o exercício de seu direito.</Text>
            <Text style={styles.tcP}>O pedido deverá ser enviado ao e-mail: apreciatto@apreciatto.com, ou por correio, ao seguinte endereço:</Text>
            <Text style={styles.tcP}>Saa Q 2 a 440 - SaaN</Text>
            <Text style={styles.tcP}>Brasília - DF,</Text>
            <Text style={styles.tcP}>70632-210</Text>
            <Text style={styles.tcP}>O usuário será informado em caso de retificação ou eliminação dos seus dados.</Text>
            <Text style={styles.tcT}>3. Dever de não fornecer dados de terceiros</Text>
            <Text style={styles.tcP}>Durante a utilização do site, a fim de resguardar e de proteger os direitos de terceiros, o usuário do aplicativo deverá fornecer somente seus dados pessoais, e não os de terceiros.</Text>
            <Text style={styles.tcT}>4. Tipos de dados coletados</Text>
            <Text style={styles.tcT}>4.1. Dados de identificação do usuário para realização de cadastro</Text>
            <Text style={styles.tcP}>A utilização, pelo usuário, de determinadas funcionalidades do aplicativo dependerá de cadastro, sendo que, nestes casos, os seguintes dados do usuário serão coletados e armazenados:</Text>
            <Text style={styles.tcP}>- nome</Text>
            <Text style={styles.tcP}>- data de nascimento</Text>
            <Text style={styles.tcP}>- endereço de e-mail</Text>
            <Text style={styles.tcP}>- endereço postal</Text>
            <Text style={styles.tcP}>- detalhes de redes sociais</Text>
            <Text style={styles.tcP}>- número de telefone</Text>
            <Text style={styles.tcP}>- número de CPF</Text>
            <Text style={styles.tcP}>- Imagens pessoais</Text>
            <Text style={styles.tcT}>4.1.2. Registros de acesso</Text>
            <Text style={styles.tcP}>Em atendimento às disposições do art. 15, caput e parágrafos, da Lei Federal n. 12.965/2014 (Marco Civil da Internet), os registros de acesso do usuário serão coletados e armazenados por, pelo menos, seis meses.</Text>
            <Text style={styles.tcT}>4.1.3. Newsletter</Text>
            <Text style={styles.tcP}>O endereço de e-mail cadastrado pelo usuário que optar por se inscrever em nossa Newsletter será coletado e armazenado até que o usuário solicite seu descadastro.</Text>
            <Text style={styles.tcT}>4.1.4. Dados sensíveis</Text>
            <Text style={styles.tcP}>O aplicativo poderá coletar os seguintes dados sensíveis dos usuários:</Text>
            <Text style={styles.tcP}>- Dados bancários (utilizado para realizar o pagamento dos serviços prestados)</Text>
            <Text style={styles.tcT}>4.2. Fundamento jurídico para o tratamento dos dados pessoais</Text>
            <Text style={styles.tcP}>Ao utilizar os serviços do aplicativo, o usuário está consentindo com a presente Política de Privacidade.</Text>
            <Text style={styles.tcP}>O usuário tem o direito de retirar seu consentimento a qualquer momento, não comprometendo a licitude do tratamento de seus dados pessoais antes da retirada. A retirada do consentimento poderá ser feita pelo e-mail: apreciatto@apreciatto.com, ou por correio enviado ao seguinte endereço:</Text>
            <Text style={styles.tcP}>Saa Q 2 a 440 - SaaN</Text>
            <Text style={styles.tcP}>Brasília - DF,</Text>
            <Text style={styles.tcP}>70632-210</Text>
            <Text style={styles.tcP}>O consentimento dos relativamente ou absolutamente incapazes, especialmente de crianças menores de 16 (dezesseis) anos, apenas poderá ser feito, respectivamente, se devidamente assistidos ou representados.</Text>
            <Text style={styles.tcP}>O tratamento de dados pessoais sem o consentimento do usuário apenas será realizado em razão de interesse legítimo ou para as hipóteses previstas em lei, ou seja, dentre outras, as seguintes:</Text>
            <Text style={styles.tcP}>- para o cumprimento de obrigação legal ou regulatória pelo controlador;</Text>
            <Text style={styles.tcP}>- para a realização de estudos por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais;</Text>
            <Text style={styles.tcP}>- quando necessário para a execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o usuário, a pedido do titular dos dados;</Text>
            <Text style={styles.tcP}>- para o exercício regular de direitos em processo judicial, administrativo ou arbitral, esse último nos termos da Lei nº 9.307, de 23 de setembro de 1996 (Lei de Arbitragem);</Text>
            <Text style={styles.tcP}>- para a proteção da vida ou da incolumidade física do titular dos dados ou de terceiro;</Text>
            <Text style={styles.tcP}>- para a tutela da saúde, em procedimento realizado por profissionais da área da saúde ou por entidades sanitárias;</Text>
            <Text style={styles.tcP}>- quando necessário para atender aos interesses legítimos do controlador ou de terceiro, exceto no caso de prevalecerem direitos e liberdades fundamentais do titular dos dados que exijam a proteção dos dados pessoais;</Text>
            <Text style={styles.tcP}>- para a proteção do crédito, inclusive quanto ao disposto na legislação pertinente.</Text>
            <Text style={styles.tcT}>4.3. Finalidades do tratamento dos dados pessoais</Text>
            <Text style={styles.tcP}>Os dados pessoais do usuário coletados pelo aplicativo têm por finalidade facilitar, agilizar e cumprir os compromissos estabelecidos com o usuário e a fazer cumprir as solicitações realizadas por meio do preenchimento de formulários.</Text>
            <Text style={styles.tcP}>Os dados pessoais poderão ser utilizados também com uma finalidade comercial, para personalizar o conteúdo oferecido ao usuário, bem como para dar subsídio ao aplicativo para a melhora da qualidade e funcionamento de seus serviços.</Text>
            <Text style={styles.tcP}>Os dados de cadastro serão utilizados para permitir o acesso do usuário a determinados conteúdos do aplicativo, exclusivos para usuários cadastrados.</Text>
            <Text style={styles.tcP}>O tratamento de dados pessoais para finalidades não previstas nesta Política de Privacidade somente ocorrerá mediante comunicação prévia ao usuário, sendo que, em qualquer caso, os direitos e obrigações aqui previstos permanecerão aplicáveis.</Text>
            <Text style={styles.tcT}>4.4. Prazo de conservação dos dados pessoais</Text>
            <Text style={styles.tcP}>Os dados pessoais do usuário serão conservados por um período não superior ao exigido para cumprir os objetivos em razão dos quais eles são processados.</Text>
            <Text style={styles.tcP}>O período de conservação dos dados são definidos de acordo com os seguintes critérios:</Text>
            <Text style={styles.tcP}>Os dados permanecerão armazenados no sistema por um período máximo de 2 anos.</Text>
            <Text style={styles.tcP}>Os dados pessoais dos usuários apenas poderão ser conservados após o término de seu tratamento nas seguintes hipóteses:</Text>
            <Text style={styles.tcP}>- para o cumprimento de obrigação legal ou regulatória pelo controlador;</Text>
            <Text style={styles.tcP}>- para estudo por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais;</Text>
            <Text style={styles.tcP}>- para a transferência a terceiro, desde que respeitados os requisitos de tratamento de dados dispostos na legislação;</Text>
            <Text style={styles.tcP}>- para uso exclusivo do controlador, vedado seu acesso por terceiro, e desde que anonimizados os dados.</Text>
            <Text style={styles.tcT}>4.5. Destinatários e transferência dos dados pessoais</Text>
            <Text style={styles.tcP}>Os dados pessoais do usuário não serão compartilhadas com terceiros. Serão, portanto, tratados apenas por este aplicativo.</Text>
            <Text style={styles.tcT}>5. Do tratamento dos dados pessoais</Text>
            <Text style={styles.tcT}>5.1. Do responsável pelo tratamento dos dados (data controller)</Text>
            <Text style={styles.tcP}>O controlador, responsável pelo tratamento dos dados pessoais do usuário, é a pessoa física ou jurídica, a autoridade pública, a agência ou outro organismo que, individualmente ou em conjunto com outras, determina as finalidades e os meios de tratamento de dados pessoais.</Text>
            <Text style={styles.tcP}>Neste aplicativo, o responsável pelo tratamento dos dados pessoais coletados é Apreciatto Gourmet e Entretenimento Eireli, representada por Saulo Sarmento, que poderá ser contactado pelo e-mail: apreciatto@apreciatto.com ou no endereço:</Text>
            <Text style={styles.tcP}>Q Saan Quadra 2, 260, Zona Industrial, Brasilia, DF, CEP 70632-200, Brasil</Text>
            <Text style={styles.tcP}>O responsável pelo tratamento dos dados se encarregará diretamente do tratamento dos dados pessoais do usuário.</Text>
            <Text style={styles.tcT}>5.2. Do encarregado de proteção de dados (data protection officer)</Text>
            <Text style={styles.tcP}>O encarregado de proteção de dados (data protection officer) é o profissional encarregado de informar, aconselhar e controlar o responsável pelo tratamento dos dados, bem como os trabalhadores que tratem os dados, a respeito das obrigações do aplicativo nos termos do RGDP, da Lei de Proteção de Dados Pessoais e de outras disposições de proteção de dados presentes na legislação nacional e internacional, em cooperação com a autoridade de controle competente.</Text>
            <Text style={styles.tcP}>Neste aplicativo o encarregado de proteção de dados (data protection officer) é Saulo Sarmento, que poderá ser contactado pelo e-mail: apreciatto@apreciatto.com.</Text>
            <Text style={styles.tcT}>6. Segurança no tratamento dos dados pessoais do usuário</Text>
            <Text style={styles.tcP}>O aplicativo se compromete a aplicar as medidas técnicas e organizativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração, comunicação ou difusão de tais dados.</Text>
            <Text style={styles.tcP}>Para a garantia da segurança, serão adotadas soluções que levem em consideração: as técnicas adequadas; os custos de aplicação; a natureza, o âmbito, o contexto e as finalidades do tratamento; e os riscos para os direitos e liberdades do usuário.</Text>
            <Text style={styles.tcP}>O aplicativo utiliza certificado SSL (Secure Socket Layer) que garante que os dados pessoais se transmitam de forma segura e confidencial, de maneira que a transmissão dos dados entre o servidor e o usuário, e em retroalimentação, ocorra de maneira totalmente cifrada ou encriptada.</Text>
            <Text style={styles.tcP}>No entanto, o aplicativo se exime de responsabilidade por culpa exclusiva de terceiro, como em caso de ataque de hackers ou crackers, ou culpa exclusiva do usuário, como no caso em que ele mesmo transfere seus dados a terceiro. O aplicativo se compromete, ainda, a comunicar o usuário em prazo adequado caso ocorra algum tipo de violação da segurança de seus dados pessoais que possa lhe causar um alto risco para seus direitos e liberdades pessoais.</Text>
            <Text style={styles.tcP}>A violação de dados pessoais é uma violação de segurança que provoque, de modo acidental ou ilícito, a destruição, a perda, a alteração, a divulgação ou o acesso não autorizados a dados pessoais transmitidos, conservados ou sujeitos a qualquer outro tipo de tratamento.</Text>
            <Text style={styles.tcP}>Por fim, o aplicativo se compromete a tratar os dados pessoais do usuário com confidencialidade, dentro dos limites legais.</Text>
            <Text style={styles.tcT}>7. Dados de navegação (cookies)</Text>
            <Text style={styles.tcP}>Cookies são pequenos arquivos de texto enviados pelo aplicativo ao computador do usuário e que nele ficam armazenados, com informações relacionadas à navegação do aplicativo.</Text>
            <Text style={styles.tcP}>Por meio dos cookies, pequenas quantidades de informação são armazenadas pelo navegador do usuário para que nosso servidor possa lê-las posteriormente. Podem ser armazenados, por exemplo, dados sobre o dispositivo utilizado pelo usuário, bem como seu local e horário de acesso ao aplicativo.</Text>
            <Text style={styles.tcP}>Os cookies não permitem que qualquer arquivo ou informação sejam extraídos do disco rígido do usuário, não sendo possível, ainda, que, por meio deles, se tenha acesso a informações pessoais que não tenham partido do usuário ou da forma como utiliza os recursos do aplicativo.</Text>
            <Text style={styles.tcP}>É importante ressaltar que nem todo cookie contém informações que permitem a identificação do usuário, sendo que determinados tipos de cookies podem ser empregados simplesmente para que o aplicativo sejam carregado corretamente ou para que suas funcionalidades funcionem do modo esperado.</Text>
            <Text style={styles.tcP}>As informações eventualmente armazenadas em cookies que permitam identificar um usuário são consideradas dados pessoais. Dessa forma, todas as regras previstas nesta Política de Privacidade também lhes são aplicáveis.</Text>
            <Text style={styles.tcT}>7.1. Cookies do aplicativo</Text>
            <Text style={styles.tcP}>Os cookies do aplicativo são aqueles enviados ao computador ou dispositivo do usuário e administrador exclusivamente pelo aplicativo.</Text>
            <Text style={styles.tcP}>As informações coletadas por meio destes cookies são utilizadas para melhorar e personalizar a experiência do usuário, sendo que alguns cookies podem, por exemplo, ser utilizados para lembrar as preferências e escolhas do usuário, bem como para o oferecimento de conteúdo personalizado.</Text>
            <Text style={styles.tcP}>Estes dados de navegação poderão, ainda, ser compartilhados com eventuais parceiros do aplicativo, buscando o aprimoramento dos produtos e serviços ofertados ao usuário.</Text>
            <Text style={styles.tcT}>7.2. Gestão dos cookies e configurações do navegador</Text>
            <Text style={styles.tcP}>O usuário poderá se opor ao registro de cookies pelo aplicativo, bastando que desative esta opção no seu próprio navegador ou aparelho.</Text>
            <Text style={styles.tcP}>A desativação dos cookies, no entanto, pode afetar a disponibilidade de algumas ferramentas e funcionalidades do aplicativo, comprometendo seu correto e esperado funcionamento. Outra consequência possível é remoção das preferências do usuário que eventualmente tiverem sido salvas, prejudicando sua experiência.</Text>
            <Text style={styles.tcP}>A seguir, são disponibilizados alguns links para as páginas de ajuda e suporte dos navegadores mais utilizados, que poderão ser acessadas pelo usuário interessado em obter mais informações sobre a gestão de cookies em seu navegador:</Text>
            <Text style={styles.tcP}>Internet Explorer:</Text>
            <Text style={styles.tcP}>https://support.microsoft.com/pt-br/help/17442/windows-internet-explorer-delete-manage-cookies</Text>
            <Text style={styles.tcP}>Safari:</Text>
            <Text style={styles.tcP}>https://support.apple.com/pt-br/guide/safari/sfri11471/mac</Text>
            <Text style={styles.tcP}>Google Chrome:</Text>
            <Text style={styles.tcP}>https://support.google.com/chrome/answer/95647?hl=pt-BR&hlrm=pt</Text>
            <Text style={styles.tcP}>Mozila Firefox:</Text>
            <Text style={styles.tcP}>https://support.mozilla.org/pt-BR/kb/ative-e-desative-os-cookies-que-os-sites-usam</Text>
            <Text style={styles.tcP}>Opera:</Text>
            <Text style={styles.tcP}>https://www.opera.com/help/tutorials/security/privacy/</Text>
            <Text style={styles.tcT}>8. Das alterações</Text>
            <Text style={styles.tcP}>A presente versão desta Política de Privacidade foi atualizada pela última vez em: 24/04/2020.</Text>
            <Text style={styles.tcP}>O editor se reserva o direito de modificar, a qualquer momento e sem qualquer aviso prévio, o aplicativo as presentes normas, especialmente para adaptá-las às evoluções do aplicativo SGP, seja pela disponibilização de novas funcionalidades, seja pela supressão ou modificação daquelas já existentes.</Text>
            <Text style={styles.tcP}>Dessa forma, convida-se o usuário a consultar periodicamente esta página para verificar as atualizações.</Text>
            <Text style={styles.tcP}>Ao utilizar o serviço após eventuais modificações, o usuário demonstra sua concordância com as novas normas. Caso discorde de alguma das modificações, deverá pedir, imediatamente, o cancelamento de sua conta e apresentar a sua ressalva ao serviço de atendimento, se assim o desejar.</Text>
            <Text style={styles.tcT}>9. Do Direito aplicável e do foro</Text>
            <Text style={styles.tcP}>Para a solução das controvérsias decorrentes do presente instrumento, será aplicado integralmente o Direito brasileiro.</Text>
            <Text style={styles.tcP}>Os eventuais litígios deverão ser apresentados no foro da comarca em que se encontra a sede do editor do aplicativo.</Text>
        </ScrollView>
        <TouchableOpacity 
          disabled={ !this.state.accepted } 
          onPress={() => { 
            AsyncStorage.setItem('termsofuse', 'clicked');
            navigation.navigate("Onboarding");
          }}
          style={ this.state.accepted ? styles.button : styles.buttonDisabled }
        >
          <Text style={styles.buttonLabel}>Aceitar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const { width , height } = Dimensions.get('window');

const styles = {

  container:{
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  tcP: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcP:{
      marginTop: 10,
      fontSize: 12
  },
  tcT: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcL:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .8
  },

  button:{
      backgroundColor: '#5E72E4',
      borderRadius: 5,
      padding: 10
  },

  buttonDisabled:{
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
 },

  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }

}

export default TermsAndConditions;