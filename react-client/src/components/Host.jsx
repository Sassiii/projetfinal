import React from 'react';
import axios from 'axios';
class Host extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.remove = this.remove.bind(this)
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        this.props.changeIsHost()
        axios.get('/api/host').then((data) => {
            let annoucements = data.data.filter(annoucement =>
                annoucement.host === this.props.id
            )
            console.log(annoucements);
            this.setState({
                data: annoucements
            })
        })
    }
    remove(annoucement) {
        console.log("announcement to delete:", annoucement);
        axios.post('/api/host/addtohistoric/' + this.props.id, annoucement).then((res) => {
            axios.delete('/api/host/delete/' + annoucement._id).then((res) => {

            })


            axios.put('/api/renting/announcement/update', { id: annoucement._id, host: annoucement.host }).then((data) => {

                console.log('succes')
            })
        })

        this.componentDidMount()
    }
    update(announcement) {
        this.props.changeAnnouncementToUpdate(announcement)
        this.props.changeView('updateannouncement')
    }

    render() {

        return (
            <div>
                {
                    this.state.data.map((annoucement, index) => (
                        <div className="hostAnnoucement" key={index}>
                            <h2>{annoucement.title}</h2>
                            <div className="imgs">
                                <img src={annoucement.picture1} className="hostAnnoucementImg" alt="img1" />
                                <img src={annoucement.picture2} className="hostAnnoucementImg" alt="img2" />
                                <img src={annoucement.picture3} className="hostAnnoucementImg" alt="img3" />
                                <img src={annoucement.picture4} className="hostAnnoucementImg" alt="img4" />
                                <img src={annoucement.picture5} className="hostAnnoucementImg" alt="img5" />
                            </div>
                            <div>
                                <h2>{annoucement.address}</h2>
                                <p>{annoucement.description}</p>
                                <p>available rooms: {annoucement.numberOfRooms}</p>
                                <p>max visitors: {annoucement.numberOfVisitors}  </p>
                                <p>{annoucement.strongPoints}</p>
                                <p>{annoucement.extraAccomodations}</p>
                                <p>available from {annoucement.startDate}</p>
                                <p>to the end of {annoucement.endDate}</p>
                            </div>
                            <button type='' className="btn" onClick={() => (this.remove(annoucement))}>Delete</button>
                            <button type='' className="btn" onClick={() => (this.update(annoucement))}>Update</button>
                        </div>
                    )
                    )
                }
            </div>
        )
    }
}
export default Host;