import React, { Component } from 'react';
import '../cssCode/styleIndex.css'
import Axios from 'axios';
import imgUser from '../images/caricatura.jpg';





class chat extends React.Component {
    constructor() {
        super();
        this.user = '';
        this.state = {
            lista: [],
            msg: [],
            msgList: '',
            nameSear: '',
            nameUser: '',
            userSelect: '',
        };

        var userLog = JSON.parse(localStorage.getItem('userLog'));
        this.user = userLog.name;
        this.state.nameUser = this.user;


        this.onChange = (evento) => {
            //console.log(evento.target.name, evento.target.value)
            evento.preventDefault();
            const campo = evento.target.name;
            if (campo === 'searchUser')
                this.setState({ nameSear: evento.target.value.trim() });

            if (campo === 'txtMsg')
                this.setState({ msgList: evento.target.value.trim() });
        };


        this.setUser = (id) => {
            this.setState({
                msg: [],
            });
            var temp = JSON.parse(localStorage.getItem('usuarios'));
            this.state.userSelect = temp[id].name + " " + temp[id].lastName;
            console.log(this.state);
            Axios({
                method: 'post', // verbo http
                url: '/getChat', // url
                data: this.state,
                mpany: "users" // Parâmetro 2 enviado
            }).then(response => {
                localStorage.setItem("conversation", JSON.stringify(response.data));
                const listap = this.state.msg.slice();
                var temp2 = JSON.parse(localStorage.getItem('conversation'));
                for (let cont = 0; temp2.length > cont; cont++) {
                    listap.push(temp2[cont].nameChat + ': ' + temp2[cont].msg);
                }
                this.setState({
                    msg: listap,
                });
                //console.log(this.state.msg);
            }).catch(error => { });

        };


        this.timerID = setInterval(
            () => this.onTick(), 5000
        );


        this.onTick = () => {
            this.setState({
                msg: [],
            });
            console.log(this.state + ' tempos');
            if (this.state.userSelect === '') {
                return
            } else {

                Axios({
                    method: 'post', // verbo http
                    url: '/getChat', // url
                    data: this.state,
                    mpany: "users" // Parâmetro 2 enviado
                }).then(response => {
                    localStorage.setItem("conversation", JSON.stringify(response.data));
                    const listap = this.state.msg.slice();
                    var temp2 = JSON.parse(localStorage.getItem('conversation'));
                    for (let cont = 0; temp2.length > cont; cont++) {
                        listap.push(temp2[cont].nameChat + ': ' + temp2[cont].msg);
                    }
                    this.setState({
                        msg: listap,
                    });
                    //console.log(this.state.msg);
                }).catch(error => { });
            }
        };

        this.exitBtn = (evento) => {
            evento.preventDefault();
            Axios({
                method: 'post', // verbo http
                url: '/exit', // url
                data: this.state,
                mpany: "users" // Parâmetro 2 enviado
            }).then(response => {
                localStorage.clear();
                window.open('/#/');
                window.close();
            }).catch(error => { });
        }

        this.postaMSG = (evento) => {
            evento.preventDefault();
            this.setState({
                msg: [],
            });
            if (this.state.userSelect === '') {
                return
            } else {
                Axios({
                    method: 'post', // verbo http
                    url: '/conversation', // url
                    data: this.state,
                    mpany: "users" // Parâmetro 2 enviado
                }).then(response => {
                    localStorage.setItem("conversation", JSON.stringify(response.data));
                    const listap = this.state.msg.slice();
                    var temp2 = JSON.parse(localStorage.getItem('conversation'));
                    for (let cont = 0; temp2.length > cont; cont++) {
                        listap.push(temp2[cont].nameChat + ': ' + temp2[cont].msg);
                    }
                    this.setState({
                        msg: listap,
                    });
                    console.log(response);
                }).catch(error => { });
            }
            this.setState({
                msgList: '',
            });

        }


        this.consultaUser = (evento) => {
            evento.preventDefault();
            this.setState({
                lista: []
            });
            Axios({
                method: 'post', // verbo http
                url: '/listChat', // url
                data: this.state,
                mpany: "users" // Parâmetro 2 enviado
            }).then(response => {
                localStorage.setItem("usuarios", JSON.stringify(response.data));
                var temp = JSON.parse(localStorage.getItem('usuarios'));
                const listap = this.state.lista.slice();

                for (let cont = 0; temp.length > cont; cont++) {
                    if (temp[cont].name + " " + temp[cont].lastName !== this.state.nameUser)
                        listap.push(temp[cont].name + " " + temp[cont].lastName);
                }

                this.setState({
                    lista: listap,
                    nameSear: ''
                });
                console.log(this.state.lista);
            }).catch(error => { });
        }


    }

    render() {
        return (
            <div className='container-fluid'>
                <div className="row content">

                    <ListView temp={this.state.lista}
                        onChange={this.onChange}
                        consultaUser={this.consultaUser}
                        nameSear={this.state.nameSear}
                        nameUser={this.state.nameUser}
                        setUser={this.setUser} />

                    <ChatView temp={this.state.msg}
                        onChange={this.onChange}
                        postaMSG={this.postaMSG}
                        textoMSG={this.state.msgList}
                        exitBtn={this.exitBtn} />
                </div>

                <footer>
                    <h5>Developer Erik Zambeli Student at Universidade Tecnologica Federal do Paraná - Bachelor of Software Engineering</h5>
                </footer>
            </div >
        );


    }

}


const ListView = (props) => (
    <div className="col-sm-3 sidenav">
        <h4 id="h4User" name='h4User'><img id="imgUser" src={imgUser} alt="ImagenUser" />{props.nameUser}</h4>
        <div id="btn1" className="input-group">
            <input type="text" className="form-control" placeholder="Search User.." name="searchUser"
                onChange={props.onChange} value={props.nameSear} />
            <span className="input-group-btn">
                <button onClick={props.consultaUser} className="btn btn-default" type="button">
                    <span className="glyphicon glyphicon-search"></span>
                </button>
            </span>
        </div>

        <div id="divList" >
            <ul id="listPeople" className="list-group">
                {props.temp.map((name, key) =>
                    <li id={'pessoa' + key} onClick={() => props.setUser(key)} key={key} style={{ color: 'black', padding: '10%', fontSize: '150%' }} className="list-group-item list-group-item-action"> {name}</li>)
                }
            </ul>
        </div>
    </div>
);

const ChatView = (props) => (

    <div className="col-sm-9">
        <h4><small>RECENT POSTS</small></h4>
        <div className="form-group" id="chatDiv">
            <ul id="chatMsg" className="list-group">
                <li>
                    {props.temp.map((name, key) =>
                        <h4 id={'namePessoa' + key} key={key}> {name}</h4>)
                    }
                </li>
            </ul>
        </div>
        <form role="form">
            <div className="form-group">
                <textarea className="form-control" rows="3" name='txtMsg'
                    onChange={props.onChange} value={props.textoMSG}></textarea>
            </div>
        </form>
        <button id="btnSubmit" className="btn btn-success" onClick={props.postaMSG}>Submit</button>
        <br />
        <br />
        <form >
            <button id="btnExit" type="submit" className="btn btn-danger" onClick={props.exitBtn}>EXIT SISTEM</button>
        </form>
        <br /><br />
    </div>
);

export default chat;