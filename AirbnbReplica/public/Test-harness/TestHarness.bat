call loadtest http://localhost:3000/ -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/getUserBids -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/clicksPerPage -P -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/getAuctionableProperties -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/getTrip -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/starthosting -P -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/isUserLoggedIn -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/getHostTrips -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/getHostDetails -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/logout -t 10 -c 10 --rps 100
call loadtest http://localhost:3000/userTracking -t 10 -c 10 --rps 100
cmd /k