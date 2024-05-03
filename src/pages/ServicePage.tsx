import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';


import Loading from '../components/LoadingSpinner';
import ListDot from '/listdot.png';
import ListArrow from '/listarrow.png';
import EmaloteIcon from '/emalote.png';
import AuditIcon from '/audit.png';
import RevisionIcon from '/revision.png';
import SegregationIcon from '/segregation.png';
import QueryIcon from '/query.png';
import RecoveryIcon from '/recovery.png';
import TurnBackIcon from '/turnbackicon.png'


interface SubModulo {
    id: string;
    Descricao: string;
}

const ServicePage = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const [subModulos, setSubModulos] = useState<SubModulo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [firstPageIcon, setFirstPageIcon] = useState<string>('');
    const [firstPageTitle, setFirstPageTitle] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://j71yi4eoc6.execute-api.sa-east-1.amazonaws.com/dev/impostograma/desafio/listarModulos', {
                    headers: {
                        Authorization: 'RRwPrJsGdiwdWZ1CZj9srRtCdQ99LPeg'
                    }
                });
                // Achamos o item unico pelo seu ID, nesse caso é o ID mais exterior
                const selectedItem = response.data.body.find((item: any) => item.id.toString() === itemId);


                // Capturamos o SubModulos do item que foi selecionado na pagina anterior
                if (selectedItem) {
                    setSubModulos(selectedItem.subModulos);
                    // Setamos o icone e o titulo (Baseado no campo "Descricao" da API) baseado na escolha do usuario da pagina anterior
                    setFirstPageIcon(getIcon(selectedItem.Descricao));
                    setFirstPageTitle(selectedItem.Descricao);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [itemId]);

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
                return ''; // Aqui podemos escolher um ícone padrão caso nenhuma essas opções sejam retornadas pela API
        }
    };

    if (loading) {
        return (
            <motion.div
                initial={{ scale: '0%' }}
                animate={{ scale: '100%', transition: { duration: 0.2 } }}
                exit={{ opacity: '0%' }}
                className="w-full flex justify-center"
            >
                <Loading />
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ scale: '0%' }}
            animate={{ scale: '100%', transition: { duration: 0.2 } }}
            exit={{ opacity: '0%' }} 
            className="h-full flex flex-col justify-between"
        >
          
            <ul className='w-full flex flex-col justify-center items-center gap-3 '>
                <div id="icon-and-title" className='flex items-center gap-3 mb-8'>
                    {/* Renderizar o icone do serviço que foi escolhido no menu principal */}
                    {firstPageIcon && (
                        <img src={firstPageIcon} alt="First page icon" className="w-24 h-24" />
                    )}
                    {/* Renderizar o título do serviço que foi escolhido no menu principal */}
                    {firstPageTitle && <h1 className="font-medium text-title-grey text-3xl">{firstPageTitle}</h1>}
                </div>
                {subModulos.map((subModulo, index) => (
                <NavLink to={`/servicedesc/${itemId}/${subModulo.id}`} className="w-11/12 sm:w-1/2">
                    <motion.li 
                        key={subModulo.id} 
                        className="bg-white flex rounded-lg border-white border-2 items-center justify-between py-2 px-2 shadow-lg transition duration-300 ease-in-out hover:border-hover-green"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <img src={ListDot} alt="Ponto visual de item de lista" />
                        
                            <span className='text-font-grey font-light text-sm sm:text-lg'>{subModulo.Descricao}</span>
                      
                        <img src={ListArrow} alt="Seta visual de item de lista" />
                    </motion.li>  
                    </NavLink>
                ))}

              <NavLink to="/" className="flex items-center text-font-grey gap-2 mb-4 mt-8">
                <img src={TurnBackIcon} alt="" />
                Voltar
              </NavLink>  
            </ul>

           
        </motion.div>
    );
};

export default ServicePage;
