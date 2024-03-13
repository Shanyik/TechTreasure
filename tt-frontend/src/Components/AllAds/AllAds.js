import ShowAds from '../ShowAds/ShowAds';

const AllAds = () => {
    return (
        <>
            <div>
                <hr style={{ width: '50%', margin: 'auto', marginTop: '3%', marginBottom: '30px' }} />
                <div className="text-center mb-4">
                    <h1>All Ads</h1>
                </div>
                <ShowAds isSearchBar={true}/>
            </div>
        </>
    );
};

export default AllAds;
