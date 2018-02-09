import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { criarDenunciaRequisicao } from '../../actions/criarDenunciaActions';
import NovaDenunciaForm from '../../components/denuncias/NovaDenunciaForm';
import { validaDenuncia } from './validaDenuncia';

export class NovaDenunciaContainer extends Component {
  constructor(props) {
    super(props);
    this.onPressSaveButton = this.onPressSaveButton.bind(this);
    this.adicionarDenunciaNoForm = this.adicionarDenunciaNoForm.bind(this);
    this.state = {
      vitima: null,
      denunciante: null,
      testemunha: null,
      userId: this.props.currentUserUID,
    };
  }

  onPressSaveButton() {
    const mensagemError = validaDenuncia(this.state.vitima);
    if (mensagemError === undefined) {
      this.props.criarDenunciaRequisicao({
        ...this.state
      });
    } else {
      alert(mensagemError);
    }
  }


  adicionarDenunciaNoForm(denuncia) {
    this.setState({
      ...denuncia,
    })
  }

  render() {
    const denunciaCadastradaComSucesso = this.props.denunciaCadastradaComSucesso;
    if (denunciaCadastradaComSucesso) {
      return <Redirect to="/painel/proximosPassos" />;
    } return (
      <NovaDenunciaForm
        salvarDenuncia={this.onPressSaveButton}
        alterarDenunciaForm={this.adicionarDenunciaNoForm}
      />
    );
  }
}

NovaDenunciaContainer.propTypes = {
  currentUserUID: PropTypes.string.isRequired,
  criarDenunciaRequisicao: PropTypes.func.isRequired,
  denunciaCadastradaComSucesso: PropTypes.bool.is
};

NovaDenunciaContainer.defaultProps = {
  denunciaCadastradaComSucesso: false
};


const mapStateToProps = state => ({
  denunciante: state.auth ? state.auth.user.uid : undefined,
  denunciaCadastradaComSucesso: state.denunciaComSucessoReducer.denunciaCadastradaComSucesso
});

const mapDispatchToProps = dispatch => bindActionCreators({
  criarDenunciaRequisicao,
}, dispatch);

const reduxNovaDenuncia = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NovaDenunciaContainer);

export default reduxNovaDenuncia;
