import { Image, Modal, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import api from "../../services/api";
import {
    Wrapper,
    Container,
    Form,
    TextContainer,
    TextBlack,
    TextLink,
    TextLinkContainer,
    ModalOverlay,
    ModalContainer,
    ModalText,
    ModalButton,
    ModalButtonText,
} from "./styles";

import BGTop from "../../assets/BGTop.png";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import { NavigationProp } from "@react-navigation/native";

type LoginProps = {
    navigation: NavigationProp<any>;
};

export default function Login({ navigation }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [errorModalVisible, setErrorModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

    const handleLogin = async () => {
        
        try {
            const response = await api.get("/usuarios");
            const users = response.data;
            const user = users.find(
                (u) => u.email === email && u.senha === password
            );

            if (user) {
                navigation.navigate("Auth", { screen: "Home" });
            } else {
                if (email === "" && password === "") {
                    setErr("Preencha o email e a senha");
                }
                else if (email === "") {
                    setErr("Preencha o email");
                } else if (password === "") {
                    setErr("Preencha a senha");
                } else {
                    setErr("Email ou senha incorretos!");
                }
                setErrorModalVisible(true); // Exibe o modal de erro quando o login falha
            }
        } catch (error) {
            console.log(error);
            setErrorModalVisible(true); // Exibe o modal caso ocorra um erro na requisição
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} />
            <Container>
                <Form>
                    <Logo />
                    <Input
                        label="E-mail"
                        placeholder="digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        label="Senha"
                        placeholder="digite sua senha"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button
                        title="Entrar"
                        noSpacing={true}
                        variant="primary"
                        onPress={handleLogin}
                    />
                    <TextContainer>
                        <TextBlack>Não tem uma conta?</TextBlack>
                        <TextLinkContainer
                            onPress={() => navigation.navigate("FormScreen")}
                        >
                            <TextLink>Crie agora mesmo.</TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>
            </Container>

            {/* Modal de erro */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={errorModalVisible}
                onRequestClose={() => setErrorModalVisible(false)} // Fecha o modal
            >
                <ModalOverlay>
                    <ModalContainer>
                        <ModalText>{err}</ModalText>
                        <ModalButton onPress={() => {setErrorModalVisible(false); setErr("");}} >
                            <ModalButtonText>Fechar</ModalButtonText>
                        </ModalButton>
                    </ModalContainer>
                </ModalOverlay>
            </Modal>
        </Wrapper>
    );
}
