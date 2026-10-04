# Host build of the sleeve firmware core and its unit tests (the ESP32-S3 build wraps the same headers).
CXX ?= g++
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Werror

test: build/test_main
	./build/test_main

build/test_main: test/test_main.cpp src/*.h
	mkdir -p build
	$(CXX) $(CXXFLAGS) -o $@ test/test_main.cpp

clean:
	rm -rf build

.PHONY: test clean
