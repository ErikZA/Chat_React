import React, { Component } from 'react';
import '../cssCode/index.css'
import Axios from 'axios';
import {isAutenticSet} from '../routers/auth';
import {Link, Redirect} from 'react-router';

class login extends React.Component {

  constructor() {
    super();
    this.errorMSG = '';
    this.errorMSG2 = '';
    this.state = {
      name: '',
      lastName: '',
      passWord: '',
      cadName: '',
      cadLastName: '',
      cadPassWord: '',
      cadConfirmedPassWord: ''
    };

    this.onChange = (evento) => {
      //console.log(evento.target.name, evento.target.value)
      const campo = evento.target.name;
      if (campo === 'name')
        this.setState({ name: evento.target.value.trim() });

      if (campo === 'lastName')
        this.setState({ lastName: evento.target.value.trim() });

      if (campo === 'passWord')
        this.setState({ passWord: evento.target.value.trim() });

      if (campo === 'cadName')
        this.setState({ cadName: evento.target.value.trim() });

      if (campo === 'cadLastName')
        this.setState({ cadLastName: evento.target.value.trim() });

      if (campo === 'cadPassWord')
        this.setState({ cadPassWord: evento.target.value.trim() });

      if (campo === 'cadConfirmedPassWord')
        this.setState({ cadConfirmedPassWord: evento.target.value.trim() });
    };

    this.onSubmit = (evento) => {
      evento.preventDefault();
      if ((this.state.cadConfirmedPassWord === this.state.cadPassWord && this.state.cadPassWord.length > 2) &&
        (this.state.cadName !== '' && this.state.cadLastName !== '')) {
        //console.log(this.state.confirmedPassWord + "new")
        Axios({
          method: 'post', // verbo http
          url: '/new', // url
          data: this.state,
          mpany: "login" // Parâmetro 2 enviado
        }).then(response => {
          var msg = JSON.parse(JSON.stringify(response.data));
          //console.log(msg[0].errorMSG);
          this.errorMSG = msg[0].errorMSG;
          this.setState({ name: '' });
          this.setState({ lastName: '' });
          this.setState({ passWord: '' });
          this.setState({ cadName: '' });
          this.setState({ cadLastName: '' });
          this.setState({ cadPassWord: '' });
          this.setState({ cadConfirmedPassWord: '' });
        }).catch(error => {
          console.log(error + "Servidor erro");
          this.errorMSG = "Senha ou usuario incorreto";
          this.errorMSG2 = "Senha Vazia ou invalida";
          this.setState({ name: '' });
          this.setState({ lastName: '' });
          this.setState({ passWord: '' });
          this.setState({ cadName: '' });
          this.setState({ cadLastName: '' });
          this.setState({ cadPassWord: '' });
          this.setState({ cadConfirmedPassWord: '' });
        })
      } else {
        if (this.state.passWord.length > 2 && this.state.name !== '') {
          //console.log(this.state.passWord + "load")
          Axios({
            method: 'post', // verbo http
            url: '/loginChat', // url
            data: this.state,
            mpany: "login" // Parâmetro 2 enviado
          }).then(response => {
            var msg = JSON.parse(JSON.stringify(response.data));
            var temp = this.state.name+' '+ this.state.lastName;
            if (msg.name === temp) {
              localStorage.setItem("userLog", JSON.stringify(response.data));
              window.open('/app#/');
              window.close();
            } else {
              this.errorMSG = 'Senha ou usuario incorreto';
              this.setState({ name: '' });
              this.setState({ lastName: '' });
              this.setState({ passWord: '' });
              this.setState({ cadName: '' });
              this.setState({ cadLastName: '' });
              this.setState({ cadPassWord: '' });
              this.setState({ cadConfirmedPassWord: '' });
            }
          }).catch(error => {
            console.log(error + "Servidor erro");
            this.errorMSG = "Senha ou usuario incorreto";
            this.errorMSG2 = "Senha Vazia ou invalida";
            this.setState({ name: '' });
            this.setState({ lastName: '' });
            this.setState({ passWord: '' });
            this.setState({ cadName: '' });
            this.setState({ cadLastName: '' });
            this.setState({ cadPassWord: '' });
            this.setState({ cadConfirmedPassWord: '' });
          })
        } else {
          console.log(this.state.passWord + "load errado")
          this.errorMSG = "Senha ou usuario incorreto";
          this.errorMSG2 = "Senha Vazia ou invalida";
          this.setState({ name: '' });
          this.setState({ lastName: '' });
          this.setState({ passWord: '' });
          this.setState({ cadName: '' });
          this.setState({ cadLastName: '' });
          this.setState({ cadPassWord: '' });
          this.setState({ cadConfirmedPassWord: '' });
        }
      }
    }
  }


  render() {
    return (
      <div className='container-fluid'>
        <div className="row">
          <div id="log" className="col-sm-6" style={{ backgroundColor: '#F1CFFF' }}>
            Name:<br />
            <input name='name' type="text" value={this.state.name} onChange={this.onChange} /><br />
            Last Name:<br />
            <input type="text" name='lastName' value={this.state.lastName} onChange={this.onChange} /><br />
            Password:<br />
            <input type="password" name="passWord" value={this.state.passWord} onChange={this.onChange} /><br />
            {this.errorMSG2}<br />
            <input type="submit" className="btn btn-primary btn-md" onClick={this.onSubmit} />
            <br />
            <br />
            <h4>{this.errorMSG}</h4>
            <p id="msgAviso" style={{ display: 'none' }}>
              <span>Não é permitido voltar pelo botão do browser.</span>
            </p>
          </div>

          <div id="cad" className="col-sm-6" style={{ backgroundColor: '#E8D8BC' }}>
            Name:<br />
            <input name='cadName' value={this.state.cadName} onChange={this.onChange} type="text" /><br />
            Last Name:<br />
            <input name='cadLastName' value={this.state.cadLastName} onChange={this.onChange} type="text" /><br />
            Password:<br />
            <input name="cadPassWord" value={this.state.cadPassWord} onChange={this.onChange} type="password" /><br />
            Confirmed Password:<br />
            <input name="cadConfirmedPassWord" value={this.state.cadConfirmedPassWord} onChange={this.onChange} type="password" /><br />
            <p>{this.errorMSG2}</p><br />
            <input type="submit" className="btn btn-primary btn-md" onClick={this.onSubmit} /><br />
            <br />
          </div>

          <footer className="container-fluid" style={{ backgroundColor: '#555' }}>
            <h5>Developer Erik Zambeli Student at Universidade Tecnologica Federal do Paraná - Bachelor of Software Engineering</h5>
          </footer>
        </div>
      </div>
    );
  }
}
export default login;
