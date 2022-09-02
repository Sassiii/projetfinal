import React from 'react';
import axios from 'axios';
import moment from "moment";
class VisitorBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            selectedStartDate: "",
            selectedEndDate: ""
        }
this.incrementDate=this.incrementDate.bind(this)
this.decrementDate=this.decrementDate.bind(this)
    }
    componentDidMount() {
        this.props.changeIsVisitor();


        this.setState({ item: this.props.announcement })

    }

    incrementDate(string) {

        return moment(moment(string).add(1, 'd')).format('YYYY/MM/DD')
    }
    decrementDate(string) {

        return moment(moment(string).subtract(1, 'd')).format('YYYY/MM/DD')
    }
    incrementViews() {
        var incrementView = this.props.announcement.views + 1;
        console.log("incrementviews:",incrementView)
        axios.put('/api/announcement/' + this.props.announcement._id, { views: incrementView }).then((data) => {

            console.log('succes')
        })


    }
    handleChangeStartDate(e) {
        this.setState({ selectedStartDate: moment(e.target.value).format("YYYY-MM-DD") })
    }
    handleChangeEndDate(e) {
        this.setState({ selectedEndDate: moment(e.target.value).format("YYYY-MM-DD") })
    }
    confirmBooking() {
        var date_start = moment(this.props.announcement.startDate).format("YYYY-MM-DD")
        var date_selectedStart = moment(this.state.selectedStartDate).format("YYYY-MM-DD")
        var date_end = moment(this.props.announcement.endDate).format("YYYY-MM-DD")
        var date_selectedEnd = moment(this.state.selectedEndDate).format("YYYY-MM-DD")
        console.log("start and selected", date_start, date_selectedStart);
        if (date_start <=
            date_selectedStart
            && date_end >=
            date_selectedEnd) {
            console.log("can be booked available");

            var bookedAnnouncement = this.props.announcement
            bookedAnnouncement.startDate = this.state.selectedStartDate
            bookedAnnouncement.endDate = this.state.selectedEndDate
            bookedAnnouncement.visitor = this.props.id
            bookedAnnouncement.host = this.props.announcement.host
            bookedAnnouncement.announcementId = this.props.announcement._id
            //add to booking table
            console.log("data in booked announcemnt:", bookedAnnouncement);
            axios.post('/api/booking', { bookedAnnouncement: bookedAnnouncement }).then(({ data }) => {

                console.log("booked:", data._id,bookedAnnouncement.visitor)
                axios.put('/api/booking/update/visitor/' + data._id, { _id: bookedAnnouncement.visitor })
                    .then(({ data }) => {
                        console.log(data);
                    }
                    )
                axios.put('/api/booking/update/host/' + data._id, { _id: bookedAnnouncement.host })
                    .then(({ data }) => {
                        console.log(data);
                    }
                    )
            })
            // chechking the dates of start and end 
            // if selected ones are the same as announcement
            if (date_start.getFullYear()+'-'+date_start.getMonth()+'-'+date_start.getDate() === 

            date_selectedStart.getFullYear()+"-"+date_selectedStart.getMonth()+"-"+date_selectedStart.getDate()
                && date_end.getFullYear()+'-'+date_end.getMonth()+'-'+date_end.getDate()=== 
                date_selectedEnd.getFullYear()+"-"+date_selectedEnd.getMonth()+
                "-"+date_selectedEnd.getDate()) {
                //remove announcement and add it to history
                axios.post('/api/host/addtohistoric/' + this.props.id, this.props.announcement).then((res) => {
                    axios.delete('/api/host/delete/' + this.props.announcement._id).then((res) => {
                        console.log('succes for delete');
                    })


                    axios.put('/api/renting/announcement/update', { id: this.props.announcement._id, host: this.props.announcement.host }).then((data) => {

                        console.log('succes for update in host')
                    })
                    console.log("succes to add to history");
                })
            //if the srtart 
            }
            else
            if (date_start ===

                date_selectedStart
                && date_end >
                date_selectedEnd) {
                console.log("increment", date_selectedEnd,"tomorrow", this.incrementDate(date_selectedEnd));
               //it does not increment
                var tomorrow=this.incrementDate(date_selectedEnd)
                axios.put('/api/booking/update/announcement/start', {
                    _id: this.props.announcement._id,
                    startDate: tomorrow
                })
                    .then(({ data }) => {
                        console.log(data);
                        console.log("updated announcement after booking")
                    })
            }
            // else if (bookedAnnouncement.startDate > this.props.announcement.startDate
            //     && bookedAnnouncement.endDate === this.props.announcement.endDate) {
            //     axios.put('/api/booking/update/announcement/end', {
            //         _id: this.props.announcement._id,
            //         endDate:this.decrementDate( this.state.selectedStartDate )
            //     })
            //         .then(({ data }) => {
            //             console.log(data);
            //         })
            // } else if (bookedAnnouncement.startDate > this.props.announcement.startDate
            //     && bookedAnnouncement.endDate < this.props.announcement.endDate) {
            //     axios.put('/api/booking/update/announcement/end', {
            //         _id: this.props.announcement._id,
            //         endDate: this.decrementDate(this.state.selectedStartDate )
            //     })
            //         .then(({ data }) => {
            //             console.log(data);
            //         })
            //     axios.post('/api/booking/update/announcement/create',
            //         {
            //             title: this.props.announcement.title,
            //             description: this.props.announcement.description,
            //             address: this.props.announcement.address,
            //             numberOfRooms: this.props.announcement.numberOfRooms,
            //             numberOfVisitors: this.props.announcement.numberOfVisitors,
            //             extraAccomodations: this.props.announcement.extraAccomodations,
            //             strongPoints: this.props.announcement.strongPoints,
            //             startDate:this.incrementDate( this.state.selectedEndDate ),
            //             endDate: this.props.announcement.endDate,
            //             host: this.props.announcement.host,
            //             picture1: this.props.announcement.picture1,
            //             picture2: this.props.announcement.picture2,
            //             picture3: this.props.announcement.picture3,
            //             picture4: this.props.announcement.picture4,
            //             picture5: this.props.announcement.picture5,

            //         }
            //     )
            //         .then(({ data }) => {
            //             console.log(data);
            //         })
            // } else {
            //     alert("cannot book with these dates, check please your booking dates!")
            // }

        } else { alert("not available") }
    }


    render() {
        this.incrementViews()
        return (
            <div >
                <div>
                    <h1 type="text"  >{this.state.item.title}</h1>
                </div>
                <div className="announcement-Images">
                    <img src={this.state.item.picture1} />
                    <img src={this.state.item.picture2} />
                    <img src={this.state.item.picture3} />
                    <img src={this.state.item.picture4} />
                    <img src={this.state.item.picture5} />
                </div>
                <div className="booking-Infromations">
                    <label><b>Address:</b></label>
                    <text type="text"  >{this.state.item.address}</text>
                    <br />
                    <label><b>Description:</b></label>
                    <text type="text"  >{this.state.item.description}</text>
                    <br />
                    <label><b>Number of Rooms:</b></label>
                    <text type="text"  >{this.state.item.numberOfRooms}</text>
                    <br />
                    <label><b>Number of Visitors:</b></label>
                    <text type="text"  >{this.state.item.numberOfVisitors}</text>
                    <div>
                        <label><b>Start Date:</b></label>
                        <text type="text"  >{this.state.item.startDate}</text>
                        <label><b>End Date:</b></label>
                        <text type="text"  >{this.state.item.endDate}</text>
                    </div>
                </div>
                <div className="input-container">
                    <input type="date" onChange={this.handleChangeStartDate.bind(this)} className="input-field" />
                </div>
                <div className="input-container">
                    <input type="date" onChange={this.handleChangeEndDate.bind(this)} className="input-field" />
                </div>
                <button className="btn" type="submit" onClick={this.confirmBooking.bind(this)}>Book</button>

            </div>
        )
    }
}

export default VisitorBooking;