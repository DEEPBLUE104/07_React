package edu.kh.example.todoList_React.todoList.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import edu.kh.example.todoList_React.todoList.model.dto.ApiDto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ApiServiceImpl implements ApiService {

	@Value("${seoul.api.key}")
	private String apiKey; // 실제 인증키로 대체 필요

	@Override
	public List<ApiDto> getAllServices() {
	    List<ApiDto> result = new ArrayList<>();
	    
	    try {
	        String url = "http://openapi.seoul.go.kr:8088/" + apiKey + "/json/ListPublicReservationCulture/1/1000";
	        
	        RestTemplate restTemplate = new RestTemplate();
	        String response = restTemplate.getForObject(url, String.class);

	        if (!response.trim().startsWith("{")) {
	            System.err.println("❌ JSON 아님! 응답:\n" + response.substring(0, 200));
	            return Collections.emptyList();
	        }
	        
	        ObjectMapper mapper = new ObjectMapper();
	        mapper.registerModule(new JavaTimeModule()); // LocalDateTime용
	        JsonNode root = mapper.readTree(response);
	        JsonNode rows = root.path("ListPublicReservationCulture").path("row");

	        for (JsonNode node : rows) {
	            ApiDto dto = mapper.treeToValue(node, ApiDto.class);
	            System.out.println("✅ DTO 변환 성공: " + dto); // 👈 null 여부 확인
	            result.add(dto);
	        }
	    } catch (Exception e) {
	    	System.err.println("❌ 매핑 실패: ");
	        e.printStackTrace();
	    }

	    return result;
	}



}
