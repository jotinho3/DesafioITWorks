import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import EmaloteIcon from '/emalote.png';
import AuditIcon from '/audit.png';
import RevisionIcon from '/revision.png';
import SegregationIcon from '/segregation.png';
import QueryIcon from '/query.png';
import RecoveryIcon from '/recovery.png';
import Loading from '../components/LoadingSpinner';

interface Module {
    id: number;
    Descricao: string;
    subModulos: SubModulo[];
}

interface SubModulo {
    id: string;
    Descricao: string;
}

const MainMenu = () => {
    const [data, setData] = useState<Module[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://j71yi4eoc6.execute-api.sa-east-1.amazonaws.com/dev/impostograma/desafio/listarModulos', {
                    headers: {
                        Authorization: 'RRwPrJsGdiwdWZ1CZj9srRtCdQ99LPeg'
                    }
                });
                setData(response.data.body);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex flex-col items-center gap-12 mt-2'>

            <h1 className="text-4xl text-title-grey font-medium">Soluções <strong className="text-action-green">IT</strong> Works </h1>

            <motion.div
                initial={{ scale: '0%' }}
                animate={{ scale: '100%', transition: { duration: 0.2 } }}
                exit={{ opacity: '0%' }}
                className="w-full px-4 mb-32 sm:px-24 xl:48 flex flex-wrap justify-center gap-6">

                {loading ? (
                    <Loading />
                ) : (

                    data.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white p-14 rounded-lg flex flex-col items-center justify-between gap-8 w-full sm:w-1/4 shadow-xl"
                        >
                            {/* Aqui os ícones são renderizados dinamicamente de acordo com o valor da api "Descricao" */}
                            <img src={getIcon(item.Descricao)} alt={item.Descricao} className="w-24 h-24" />

                            {/* Título do card renderizado dinamicamente de acordo com o valor da api "Descricao" */}
                            <h2 className="font-medium text-2xl text-center text-title-grey">{item.Descricao}</h2>

                            {/* NavLink que leva como parâmetro o ID do serviço selecionado para a proxima página (ServicePage.tsx) */}
                            <NavLink to={`/service/${item.id}`} className="text-white px-8 rounded-md py-2 bg-action-green hover:bg-hover-green transition duration-300 ease-in-out mt-6">
                                Acessar
                            </NavLink>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    );
};

// Função de switch case em que podemos definir pelas respostas da API quais serão os icones renderizados em casos diferentes de respostas da API com base no campo "Descricao"
const getIcon = (descricao: string) => {
    switch (descricao) {
        case 'e-Malote Web':
            return EmaloteIcon;
        case 'Auditoria':
            return AuditIcon;
        case 'Revisao':
            return RevisionIcon;
        case 'Segregação':
            return SegregationIcon;
        case 'Consulta Livre Produtos':
            return QueryIcon;
        case 'Recuperação':
            return RecoveryIcon;
        default:
            return ''; //Aqui podemos retornar um ícone caso nenhuma das opções dos cases sejam retornadas 
    }
};

export default MainMenu;
