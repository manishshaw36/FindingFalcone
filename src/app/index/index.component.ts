import { Component, OnInit } from '@angular/core';
import { MyHttpService } from '../my-http.service';
import { Result } from '../result';
import * as $ from 'jquery';
import { Router } from '@angular/router';

declare var $: any;

export { newtoken };
let newtoken = {
    'status': null,
    'planet': null,
    'time': null
};

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})


export class IndexComponent implements OnInit {

    public select_planets: any;
    public select_vehicles: any;
    public token: any;

    public findFalcone: any;
    public result: any;
    public status: number;
    public resultantPlanet: string;
    public time = 0;
    public distance = 0;
    public res: Result;
    constructor(private service: MyHttpService, private route: Router) { }

    ngOnInit() {

        // Getting the Planets API using MyHttpService
        this.service.get_planets()
            .subscribe(response => {
                this.select_planets = response.json();
            },
                err => {
                    console.log('Error: ', err);
                    this.route.navigate(['error']);
                });

        // Getting the Vehicles API using MyHttpService
        this.service.get_vehicles()
            .subscribe(response2 => {
                this.select_vehicles = response2.json();
            },
                err => {
                    console.log('Error: ', err);
                    this.route.navigate(['error']);
                });

    }

    // Displaying the planets and vehicle
    // Here a is reference variable
    // For template variable of select planet and select vehicle button
    select(a) {
        if (a.style.display === 'none') {
            $(a).slideDown(600);
        } else {
            $(a).slideUp(600);
        }
    }

    // As We click on planets, myPlanet() is called.
    // It takes 5 arguments i.e
    // p as planets array
    // b as template variable of selected destination
    // p1 as template variable of select planets, used to hide the dropdown
    // d as template variable of select vehicles, used to show the dropdown
    // e is destination number
    myPlanet (p, b, p1, d, e) {

        // Logic for hiding the vehicle which is unable to reach the specified planets
        if (p.distance >= 500) {
            if (document.getElementById('Space pod' + e) !== null) {
                document.getElementById('Space pod' + e).style.display = 'none';
            }
            if (document.getElementById('Space rocket' + e) !== null) {
                document.getElementById('Space rocket' + e).style.display = 'none';
            }
            if (document.getElementById('Space shuttle' + e) !== null) {
                document.getElementById('Space shuttle' + e).style.display = 'none';
            }
        } else if (p.distance === 400) {
            if (document.getElementById('Space pod' + e) !== null) {
                document.getElementById('Space pod' + e).style.display = 'none';
            }
            if (document.getElementById('Space rocket' + e) !== null) {
                document.getElementById('Space rocket' + e).style.display = 'none';
            }
        } else if (p.distance >= 300) {
            if (document.getElementById('Space pod' + e) !== null) {
                document.getElementById('Space pod' + e).style.display = 'none';
            }
        }
        if ((this.select_planets.length === 2) && (e !== '4')) {
            // debugger;
            if ((this.searchPlanet(this.select_planets)) && (p.name !== 'Sapir')) {
                if (document.getElementById('Space shuttle' + e) !== null) {
                    document.getElementById('Space shuttle' + e).style.display = 'none';
                }
            }
        }
        if (this.select_planets.length === 4) {
            if (this.searchUnit(this.select_vehicles, 'Space ship')) {
                if ((this.select_planets[1].distance >= 400 && (p.distance < 400)) && this.searchPlanet1(this.select_planets)) {
                    if (document.getElementById('Space shuttle' + e) !== null) {
                        document.getElementById('Space shuttle' + e).style.display = 'none';
                    }
                    if ((p.name !== 'Pingasor') && (p.name !== 'Lerbin')) {
                        if (document.getElementById('Space ship' + e) !== null) {
                            document.getElementById('Space ship' + e).style.display = 'none';
                        }
                    }
                }
                // tslint:disable-next-line:max-line-length
                if ((p.distance < 400) && !this.searchUnit(this.select_vehicles, 'Space shuttle') && !this.searchPlanet1(this.select_planets)) {
                    if (document.getElementById('Space ship' + e) !== null) {
                        document.getElementById('Space ship' + e).style.display = 'none';
                    }
                }
            }
        }

        this.distance = p.distance;
        b.innerHTML = p.name;
        this.select(p1);
        b.disabled = true; // After selecting planets buttons are disabled
        this.select(d);
        const deleteIndex = this.select_planets.indexOf(p);
        this.select_planets.splice(deleteIndex, 1);
    }

    // Searching for planets i.e available or not w.r.t distance
    // Here a is array of planets
    searchPlanet(a) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].distance > 300) {
                return true;
            }
        }
        return false;
    }

    // Searching for planets i.e available or not w.r.t distance
    // Here a is array of planets
    searchPlanet1(a) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].distance < 300) {
                return true;
            }
        }
        return false;
    }

    searchPlanet2(a) {
        for (let i = 1; i < 4; i++) {
            if ($('#planet' + i).innerHTML !== a) {
                return true;
            }
        }
        return false;
    }

    // Searching for vehicle i.e available or not w.r.t number of unit
    // Here a is array of vehicles
    searchUnit(a, b) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].name === b) {
                if (a[i].total_no === 1) {
                    return true;
                }
            }
        }
        return false;
    }

    searchUnit1(a) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].max_distance > 400) {
                return true;
            }
        }
        return false;
    }

    searchUnit2(a) {
        for (let i = 1; i < 4; i++) {
            // tslint:disable-next-line:prefer-const
            let v = document.getElementById('veh' + i).innerHTML;
            if (v === a) {
                return true;
            }
        }
        return false;
    }

    // As We click on vehicle, myVehicle() is called.
    // It takes 4 arguments i.e
    // v as vehicle array
    // b as template variable of selected vehicle for specified destination
    // c as template variable of select vehicle, used to hide the dropdown
    // e is destination number
    myVehicle(v, b, c, d) {

        b.innerHTML = v.name;
        this.time = this.time + (this.distance / v.speed);
        this.select(c);
        b.disabled = true;
        const newVehicle = {
            'name': v.name,
            'total_no': 1,
            'max_distance': v.max_distance,
            'speed': v.speed
        };
        const resultObject = this.search('Pingasor', this.select_planets);
        const resultObject1 = this.search('Lerbin', this.select_planets);

        // Logic for showing relevant vehicle
        if (v.total_no === 2) {
            const newIndex = this.select_vehicles.indexOf(v);
            this.select_vehicles.splice(newIndex, 1, newVehicle);
            console.log(this.select_vehicles);
        }

        if (v.total_no === 1) {
            const newIndex = this.select_vehicles.indexOf(v);
            this.select_vehicles.splice(newIndex, 1);
            if (v.name === 'Space ship') {
                if (resultObject && resultObject1) {
                    this.select_planets.splice(this.select_planets.length - 1, 1);
                    this.select_planets.splice(this.select_planets.length - 1, 1);

                } else if (resultObject || resultObject1) {
                    this.select_planets.splice(this.select_planets.length - 1, 1);
                }

                if (this.searchUnit2('Space shuttle') && this.searchPlanet(this.select_planets)) {
                    this.select_planets.splice(this.select_planets.length - 1, 1);
                }
            }
            if (!this.search('Space ship', this.select_vehicles) && this.searchUnit2('Space shuttle')) {
                if (this.searchPlanet(this.select_planets)) {
                    this.select_planets.splice(this.select_planets.length - 1, 1);
                }
            }
        }

        if (d !== 4) {
            $('#planet' + (d + 1)).removeAttr('disabled');
        }
    }

    // Here we search for planet i.e available in planet array
    search(planet, planet_array) {
        for (let i = 0; i < planet_array.length; i++) {
            if (planet_array[i].name === planet) {
                return true;
            }
        }
        return false;
    }


    // Final Step Finding the Falcone
    // find() method is called to find Queen
    // Here it takes 8 arguments i,e
    // p1 - p4 are name of selected planets
    // v1 - v4 are name of selected vehicle
    find(p1, p2, p3, p4, v1, v2, v3, v4) {

        // Checking all are selected or not as specified
        if (p1.innerHTML === 'Select Planet') {
            alert('Please select first planet');
            return;
        } else if (v1.innerHTML === 'Select Vehicle') {
            alert('Please select first vehicle');
            return;
        } else if (p2.innerHTML === 'Select Planet') {
            alert('Please select second planet');
            return;
        } else if (v2.innerHTML === 'Select Vehicle') {
            alert('Please select second vehicle');
            return;
        } else if (p3.innerHTML === 'Select Planet') {
            alert('Please select third planet');
            return;
        } else if (v3.innerHTML === 'Select Vehicle') {
            alert('Please select third vehicle');
            return;
        } else if (p3.innerHTML === 'Select Planet') {
            alert('Please select forth planet');
            return;
        } else if (v4.innerHTML === 'Select Vehicle') {
            alert('Please select forth vehicle');
            return;
        }

        // Getting token from server
        this.service.post_token()
            .subscribe(response3 => {
                this.token = response3.json().token;
                localStorage.setItem('token', this.token);
                console.log(this.token);
                this.findFalcone = {
                    'token': this.token,
                    planet_names: [
                        p1.innerHTML, p2.innerHTML, p3.innerHTML, p4.innerHTML
                    ],
                    'vehicle_names': [
                        v1.innerHTML, v2.innerHTML, v3.innerHTML, v4.innerHTML
                    ]
                };

                // Getting result from server by sending
                // names of all planets and all vehicle
                // that are selected with the token
                this.service.post_resquest(this.findFalcone)
                    .subscribe(response4 => {
                        this.result = response4.json();
                        // debugger;
                        if (this.result.status === 'success') {
                            // debugger;
                            this.status = 1;
                            newtoken = {
                                'status': this.status,
                                'planet': this.result.planet_name,
                                'time': this.time
                            };
                            this.route.navigate(['find_falcone']);
                            // this.route.navigate(['find_falcone', status, this.result.planet_name, this.time]);
                        } else {
                            this.status = 0;
                            newtoken = {
                                'status': this.status,
                                'planet': null,
                                'time': this.time
                            };
                            this.route.navigate(['find_falcone']);
                        }

                    },
                        err => {
                            console.log('Error: ', err);
                            this.route.navigate(['error']);
                        });
            },
                err => {
                    console.log('Error: ', err);
                    this.route.navigate(['error']);
                });
    }

    // This method is to reset
    reload() {
        localStorage.clear();
        location.reload();
    }
}

