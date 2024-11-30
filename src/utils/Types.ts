export type VagaProps = {
    id: number;
    title: String;
    date: String;
    description: String;
    phone: String;
    company: String;
};

export type RootStackParamList = {
    Login: undefined;
    FormScreen: undefined;
    Home: undefined;
    Profile: undefined;
    Details: {id: number};
};

export type UserProps = {
    id: number;
    nome: String;
    date: String;
    email: String;
    senha: String;
};