import { useParams } from 'react-router-dom';
const OfferDetails = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    useEffect(() => {
        api.get(`/offers/${id}`).then(res => setOffer(res.data));
    }, [id]);
    if (!offer) return <div className="text-center p-10">Ładowanie oferty...</div>;
    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
                <img src={offer.user.avatarUrl || 'https://placehold.co/48x48'} alt={offer.user.username} className="w-12 h-12 rounded-full mr-4"/>
                <span className="font-bold">{offer.user.username}</span>
            </div>
            <h1 className="text-3xl font-bold text-indigo-700">Chce nauczyć: {offer.skill.name}</h1>
            <p className="text-gray-600 mt-2 text-lg">{offer.description}</p>
            <div className="mt-6 bg-indigo-50 p-4 rounded-md">
                <h3 className="font-semibold text-lg">W zamian szuka:</h3>
                <p className="text-xl text-indigo-800">{offer.desiredSkill}</p>
            </div>
            {/* Przycisk do zainicjowania dopasowania */}
        </div>
    );
};