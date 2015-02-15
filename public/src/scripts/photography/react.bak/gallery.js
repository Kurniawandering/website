/*** @jsx React.DOM */

'use strict';

var routeMixin 	= require('./mixin'),
		React	= require('react'),
	superagent	= require('superagent'),
	_			= require('underscore');


var GalleryComponent = React.createClass({

		mixins : [routeMixin],

		getInitalState: function(){

			return {
				slideData: ''
			};
		},

		componentDidMount: function(){

			if (this.isMounted()) {

				this.req = superagent.get('http://localhost:3000/api/flickr', function(err, res){

					this.setState({

						slideData: res.body
					});

				}.bind(this));
			}
		},

		handle : function() {

			this.props.router.navigate('bar', {

					trigger : true
			});
		},

		nextSlide: function(){


		},

		prevSlide: function(){

			console.log('lekker terug');

		},

		renderNav: function(){

			return (

			    <div className="carousel-nav">
            		<a href="#" className="prev" onClick={this.prevSlide}>prev</a>
            		<a href="#" className="next" onClick={this.nextSlide}>next</a>
        		</div>  
        	);
		},

		render : function() {

			var className = 'animate-leave animate-leave-active';

			if (this.props.router.current === 'foo') {

				className = 'animate-enter animate-enter-active';
			}

			if (this.state) {
				
				return (
					<div>
						<div className="carousel">
						    <ul>
						      {
						        this.state.slideData.map(function(item) {
						          return <li>
						          		<a>
						          		<img src={item.original}  alt={item.title} />
						          		</a>
						          	</li>
						        })
						       }
						    </ul>
						</div>

						{this.renderNav()}

					</div>
		
				);

			} else {

				return (

					<div>loading..</div>

				);
			}
		}
});

module.exports = GalleryComponent;
