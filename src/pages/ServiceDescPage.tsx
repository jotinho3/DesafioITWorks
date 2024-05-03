import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import Loading from '../components/LoadingSpinner';
import InfoIcon from '/info.png';
import TurnBackIcon from '/turnbackicon.png'

const ServiceDescPage = () => {
    const { itemId, subModuloId } = useParams<{ itemId: string; subModuloId: string }>();
    const [firstPageDescricao, setFirstPageDescricao] = useState<string>('');
    const [subModuloDescricao, setSubModuloDescricao] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://j71yi4eoc6.execute-api.sa-east-1.amazonaws.com/dev/impostograma/desafio/listarModulos',
                    {
                        headers: {
                            Authorization: 'RRwPrJsGdiwdWZ1CZj9srRtCdQ99LPeg'
                        }
                    }
                );

                const { body } = response.data;

                // Achamos o item unico pelo seu ID, nesse caso é o ID mais exterior
                const selectedItem = body.find((item: any) => item.id.toString() === itemId);

                if (selectedItem) {
                    setFirstPageDescricao(selectedItem.Descricao);

                    // Achamos o subModulo que foi selecionado na pagina anterior pelo seu ID
                    const selectedSubModulo = selectedItem.subModulos.find(
                        (subModulo: any) => subModulo.id === subModuloId
                    );

                    if (selectedSubModulo) {
                        setSubModuloDescricao(selectedSubModulo.Descricao);
                    } else {
                        console.error('SubModulo não encontrado.');
                    }
                } else {
                    console.error('O item da primeira pagina nao foi encontrado.');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [itemId, subModuloId]);

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
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl sm:text-5xl font-light text-font-grey">
                {firstPageDescricao} &gt; {subModuloDescricao}
            </h1>
            <div className="w-10/12 sm:w-8/12 border-2 border-gray-300"></div>

            <div className="bg-white w-10/12 sm:w-8/12 flex flex-col items-center relative mt-12 rounded-xl">
                <img src={InfoIcon} alt="Info" className="absolute top-[-40px]" />
                <p className="mt-8 p-12 text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ut id magni sequi quibusdam assumenda
                    perspiciatis totam culpa quos eum quaerat odio pariatur, aperiam cumque enim minima a non dolores
                    delectus corrupti. Modi nam iusto cumque laboriosam tenetur, minus blanditiis inventore laborum
                    quas et doloribus minima officiis deserunt veniam sapiente.
                </p>
            </div>

           

            <NavLink to={`/service/${itemId}`} className="flex items-center text-font-grey gap-2 mb-4 mt-8">
                <img src={TurnBackIcon} alt="" />
                Voltar
            </NavLink>  

            
        </div>
    );
};

export default ServiceDescPage;
