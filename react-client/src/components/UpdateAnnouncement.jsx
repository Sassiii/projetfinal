import React from 'react';
import axios from 'axios';



import { Cloudinary } from 'cloudinary-core';

var url = 'https://api.cloudinary.com/v1_1/drxdcalsl/upload'
var preset = 'cf3bvkos'


class UpdateAnnouncement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
            title: '',
            description: '',
            address: '',
            numberOfRooms: 0,
            numberOfVisitors: 0,
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
            strongPoints: '',
            extraAccomodations: '',
            startDate: '',
            endDate: ''
        }
this.formatDate=this.formatDate.bind(this)
this.getDate=this.getDate.bind(this)
    }
    componentDidMount() {
        var {title,description,address,numberOfRooms,numberOfVIsitors,image1,image2
        ,image3,image4,image5,strongPoints,startDate,endDate}=this.props.announcement
        this.setState({title,description,address,numberOfRooms,numberOfVIsitors,image1,image2
            ,image3,image4,image5,strongPoints,startDate,endDate})
        this.props.changeIsHost()
        
    }
    formatDate(string) {
console.log('date:', this.props.announcement)
        var year_month_date_hour = []
        year_month_date_hour[0] = string.split('T')[0].split("-")[0]
        year_month_date_hour[1] = string.split('T')[0].split("-")[1]
        year_month_date_hour[2] = string.split('T')[0].split("-")[2]
        var hour = string.split('T')[1].split('.')[0];
        year_month_date_hour[3] = hour.split(':')[0].concat(':', hour.split(':')[1])



        return year_month_date_hour
    }
    
    getDate(string) {
        var date = this.formatDate(string)
        date.splice(3, 1)

        return date.join('-')
    }
    /////// handleing uploading images 
    preview_image1(e) {
        var reader = new FileReader();
        var tag;

        reader.onload = function () {
            var output1 = document.getElementById('output_image1');
            output1.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        var formData = new FormData()
        var file = e.target.files[0]
        formData.append('file', file)
        formData.append('upload_preset', preset)
        axios({
            url: url,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formData
        }).then((res) => {
            console.log('answer for post request:', res.data.secure_url)
            this.setState({ image1: res.data.secure_url })
            console.log("state imge:", this.state.image1);
        })
            .catch((err) => {
                console.error(err)
            })
    }
    preview_image2(e) {
        var reader = new FileReader();
        var tag;

        reader.onload = function () {
            var output2 = document.getElementById('output_image2');
            output2.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        var formData = new FormData()
        var file = e.target.files[0]
        formData.append('file', file)
        formData.append('upload_preset', preset)
        axios({
            url: url,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formData
        }).then((res) => {
            console.log('answer for post request:', res.data.secure_url)
            this.setState({ image2: res.data.secure_url })
            console.log("state imge:", this.state.image2);
        })
            .catch((err) => {
                console.error(err)
            })
    }
    preview_image3(e) {
        var reader = new FileReader();
        var tag;

        reader.onload = function () {
            var output3 = document.getElementById('output_image3');
            output3.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        var formData = new FormData()
        var file = e.target.files[0]
        formData.append('file', file)
        formData.append('upload_preset', preset)
        axios({
            url: url,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formData
        }).then((res) => {
            console.log('answer for post request:', res.data.secure_url)
            this.setState({ image3: res.data.secure_url })
            console.log("state imge:", this.state.image3);
        })
            .catch((err) => {
                console.error(err)
            })
    }
    preview_image4(e) {
        var reader = new FileReader();
        var tag;

        reader.onload = function () {
            var output4 = document.getElementById('output_image4');
            output4.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        var formData = new FormData()
        var file = e.target.files[0]
        formData.append('file', file)
        formData.append('upload_preset', preset)
        axios({
            url: url,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formData
        }).then((res) => {
            console.log('answer for post request:', res.data.secure_url)
            this.setState({ image4: res.data.secure_url })
            console.log("state imge:", this.state.image4);
        })
            .catch((err) => {
                console.error(err)
            })
    }
    preview_image5(e) {
        var reader = new FileReader();
        var tag;

        reader.onload = function () {
            var output5 = document.getElementById('output_image5');
            output5.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        var formData = new FormData()
        var file = e.target.files[0]
        formData.append('file', file)
        formData.append('upload_preset', preset)
        axios({
            url: url,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formData
        }).then((res) => {
            console.log('answer for post request:', res.data.secure_url)
            this.setState({ image5: res.data.secure_url })
            console.log("state imge:", this.state.image5);
        })
            .catch((err) => {
                console.error(err)
            })
    }


    handleSubmit(e) {
        e.preventDefault();

        axios.post("/api/announcement/update", {
            title: this.state.title,
            description: this.state.description,
            address: this.state.address,
            numberOfRooms: this.state.numberOfRooms,
            numberOfVisitors: this.state.numberOfVisitors,
            picture1: this.state.image1,
            picture2: this.state.image2,
            picture3: this.state.image3,
            picture4: this.state.image4,
            picture5: this.state.image5,
            strongPoints: this.state.strongPoints,
            extraAccomodations: this.state.extraAccomodations,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            host: this.props.id
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            alert('Announcement informations are required', error)
            console.log(error);
        })

        this.props.changeView('host')
    }
    handleChangeTitle(e) {
        this.setState({ title: e.target.value })
    }
    handleChangeDescription(e) {
        this.setState({ description: e.target.value })
    }
    handleChangeAddress(e) {
        this.setState({ address: e.target.value })
    }
    handleChangeNumberOfVisitors(e) {
        this.setState({ numberOfVisitors: e.target.value })
    }
    handleChangeNumberOfRooms(e) {
        this.setState({ numberOfRooms: e.target.value })
    }
    handleChangeStrongPoints(e) {
        this.setState({ strongPoints: e.target.value })
    }
    handleChangeExtraAccomodations(e) {
        this.setState({ extraAccomodations: e.target.value })
    }
    handleChangeStartDate(e) {
        this.setState({ startDate: e.target.value })
    }
    handleChangeEndDate(e) {
        this.setState({ endDate: e.target.value })
    }

    render() {
        console.log("data from state in update", this.props.title);
        return (
            <div >
                <h1>Update an announcement</h1>
                <div className="announcementForm" >

                    <div className="announcementFormGroup">
                        <div className="input-container">
                            <input defaultValue={this.props.announcement.title} type="text" placeholder="title.."  className="input-field" onChange={this.handleChangeTitle.bind(this)} />
                        </div>
                        <div className="input-container">
                            <textarea defaultValue={this.props.announcement.description} placeholder="description .." type="text" className="input-field" onChange={this.handleChangeDescription.bind(this)}>
                            </textarea>
                        </div>
                        <div className="input-container">
                            <input defaultValue={this.props.announcement.address} type="text" placeholder="address.." className="input-field" onChange={this.handleChangeAddress.bind(this)} />
                        </div>
                        <div className="input-container">
                            <input type="number" defaultValue={this.props.announcement.numberOfRooms} placeholder="Number of rooms.." className="input-field" onChange={this.handleChangeNumberOfRooms.bind(this)} />
                        </div>
                        <div className="input-container">
                            <input type="number" defaultValue={this.props.announcement.numberOfVisitors} placeholder="Number of visitors.." className="input-field" onChange={this.handleChangeNumberOfVisitors.bind(this)} />
                        </div>
                        <div className="input-container">
                            <input type="text" defaultValue={this.props.announcement.strongPoints} placeholder="Strong Points.." className="input-field" onChange={this.handleChangeStrongPoints.bind(this)} />
                        </div>
                        <div className="input-container">
                            <input type="text" defaultValue={this.props.announcement.extraAccomodations} placeholder="Extra accomodations.." className="input-field" onChange={this.handleChangeExtraAccomodations.bind(this)} />
                        </div>
                        <div className="input-container">
                            <input type="date" defaultValue={this.getDate(this.props.announcement.startDate)}  className="input-field" onChange={this.handleChangeStartDate.bind(this)} />
                        </div>
                        <div className="input-container">
                            <input type="date" defaultValue={this.getDate(this.props.announcement.endDate)}  className="input-field" onChange={this.handleChangeEndDate.bind(this)} />
                        </div>


                    </div>

                    <p><input id="inputImg1" type="file" accept="image/*" onChange={this.preview_image1.bind(this)} /></p>
                    <p><input id="inputImg2" type="file" accept="image/*" onChange={this.preview_image2.bind(this)} /></p>
                    <p><input id="inputImg3" type="file" accept="image/*" onChange={this.preview_image3.bind(this)} /></p>
                    <p><input id="inputImg4" type="file" accept="image/*" onChange={this.preview_image4.bind(this)} /></p>
                    <p><input id="inputImg5" type="file" accept="image/*" onChange={this.preview_image5.bind(this)} /></p>
                    <div className="announcement-images">
                        <img src ={ this.props.announcement.picture1} id="output_image1" className="create-preview-image" />
                        <img src ={ this.props.announcement.picture2} id="output_image2" className="create-preview-image" />
                        <img src ={ this.props.announcement.picture3} id="output_image3" className="create-preview-image" />
                        <img src ={ this.props.announcement.picture4} id="output_image4" className="create-preview-image" />
                        <img src ={ this.props.announcement.picture5} id="output_image5" className="create-preview-image" />
                    </div>
                    <button className="btn" type="submit" onClick={this.handleSubmit.bind(this)}>Update</button>

                </div>
            </div>
        )

    }
}

export default UpdateAnnouncement;
